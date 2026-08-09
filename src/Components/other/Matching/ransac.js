import * as THREE from "three";


/* =========================================================
   POINT CLOUD
========================================================= */

export function extractVertices(object) {

    const points = [];

    object.updateMatrixWorld(true);


    object.traverse((child) => {

        if (!child.isMesh) return;


        const position =
            child.geometry.attributes.position;


        const matrix =
            child.matrixWorld;


        for (
            let i = 0;
            i < position.count;
            i++
        ) {

            const point =
                new THREE.Vector3(
                    position.getX(i),
                    position.getY(i),
                    position.getZ(i)
                );


            point.applyMatrix4(
                matrix
            );


            points.push(point);
        }
    });


    return points;
}


/* =========================================================
   CENTER
========================================================= */

function centerCloud(points) {

    const center =
        new THREE.Vector3();


    for (const point of points) {
        center.add(point);
    }


    center.divideScalar(
        points.length
    );


    return {

        center,

        points: points.map(
            point =>
                point
                    .clone()
                    .sub(center)
        )
    };
}


/* =========================================================
   VOXEL DOWNSAMPLING
========================================================= */

function voxelDownsample(
    points,
    voxelSize
) {

    const voxels =
        new Map();


    for (const point of points) {

        const x =
            Math.floor(
                point.x / voxelSize
            );

        const y =
            Math.floor(
                point.y / voxelSize
            );

        const z =
            Math.floor(
                point.z / voxelSize
            );


        const key =
            `${x}:${y}:${z}`;


        if (!voxels.has(key)) {

            voxels.set(
                key,
                {
                    position:
                        new THREE.Vector3(),

                    count: 0
                }
            );
        }


        const voxel =
            voxels.get(key);


        voxel.position.add(
            point
        );

        voxel.count++;
    }


    const result = [];


    for (
        const voxel
        of voxels.values()
    ) {

        voxel.position
            .divideScalar(
                voxel.count
            );


        result.push(
            voxel.position
        );
    }


    return result;
}


/* =========================================================
   NEAREST NEIGHBOURS
========================================================= */

function nearestNeighbours(
    points,
    index,
    k
) {

    const source =
        points[index];


    const neighbours = [];


    for (
        let i = 0;
        i < points.length;
        i++
    ) {

        if (i === index) {
            continue;
        }


        neighbours.push({

            index: i,

            distance:
                source.distanceToSquared(
                    points[i]
                )
        });
    }


    neighbours.sort(
        (a, b) =>
            a.distance -
            b.distance
    );


    return neighbours.slice(
        0,
        k
    );
}


/* =========================================================
   LOCAL DESCRIPTOR
========================================================= */

function createDescriptor(
    points,
    index,
    k = 8
) {

    const neighbours =
        nearestNeighbours(
            points,
            index,
            k
        );


    if (
        neighbours.length < k
    ) {
        return null;
    }


    const distances =
        neighbours.map(
            n =>
                Math.sqrt(
                    n.distance
                )
        );


    const average =
        distances.reduce(
            (sum, value) =>
                sum + value,
            0
        ) / distances.length;


    if (
        average <= 0
    ) {
        return null;
    }


    /*
        Normalize the local distances.

        This makes the descriptor:

        - translation invariant
        - rotation invariant
        - less dependent on mesh density
    */

    return distances.map(
        distance =>
            distance / average
    );
}


/* =========================================================
   DESCRIPTOR DISTANCE
========================================================= */

function descriptorDistance(
    a,
    b
) {

    let error = 0;


    for (
        let i = 0;
        i < a.length;
        i++
    ) {

        error +=
            Math.abs(
                a[i] - b[i]
            );
    }


    return (
        error / a.length
    );
}


/* =========================================================
   CORRESPONDENCES
========================================================= */

function createCorrespondences(
    pointsA,
    pointsB
) {

    const descriptorsA = [];
    const descriptorsB = [];


    for (
        let i = 0;
        i < pointsA.length;
        i++
    ) {

        const descriptor =
            createDescriptor(
                pointsA,
                i
            );


        if (descriptor) {

            descriptorsA.push({
                index: i,
                descriptor
            });
        }
    }


    for (
        let i = 0;
        i < pointsB.length;
        i++
    ) {

        const descriptor =
            createDescriptor(
                pointsB,
                i
            );


        if (descriptor) {

            descriptorsB.push({
                index: i,
                descriptor
            });
        }
    }


    const correspondences = [];


    for (
        const pointA
        of descriptorsA
    ) {

        const candidates = [];


        for (
            const pointB
            of descriptorsB
        ) {

            const error =
                descriptorDistance(
                    pointA.descriptor,
                    pointB.descriptor
                );


            if (
                error <= 0.22
            ) {

                candidates.push({

                    a: pointA.index,

                    b: pointB.index,

                    error
                });
            }
        }


        candidates.sort(
            (a, b) =>
                a.error -
                b.error
        );


        /*
            Keep only the strongest
            candidate correspondences.
        */

        correspondences.push(
            ...candidates.slice(
                0,
                4
            )
        );
    }


    return correspondences;
}


/* =========================================================
   LOCAL FRAME
========================================================= */

function createFrame(
    p1,
    p2,
    p3
) {

    const x =
        p2.clone()
            .sub(p1)
            .normalize();


    const temp =
        p3.clone()
            .sub(p1);


    const z =
        new THREE.Vector3()
            .crossVectors(
                x,
                temp
            );


    /*
        Collinear points can't define
        a 3D coordinate frame.
    */

    if (
        z.lengthSq() <
        1e-10
    ) {

        return null;
    }


    z.normalize();


    const y =
        new THREE.Vector3()
            .crossVectors(
                z,
                x
            )
            .normalize();


    return new THREE.Matrix4()
        .makeBasis(
            x,
            y,
            z
        );
}


/* =========================================================
   RIGID TRANSFORM
========================================================= */

function estimateTransform(
    pointsA,
    pointsB,
    sample
) {

    const frameA =
        createFrame(
            pointsA[sample[0].a],
            pointsA[sample[1].a],
            pointsA[sample[2].a]
        );


    const frameB =
        createFrame(
            pointsB[sample[0].b],
            pointsB[sample[1].b],
            pointsB[sample[2].b]
        );


    if (
        !frameA ||
        !frameB
    ) {

        return null;
    }


    const rotation =
        frameB.clone()
            .multiply(
                frameA.clone().invert()
            );


    const transformed =
        pointsA[sample[0].a]
            .clone()
            .applyMatrix4(
                rotation
            );


    const translation =
        pointsB[sample[0].b]
            .clone()
            .sub(
                transformed
            );


    rotation.setPosition(
        translation
    );


    return rotation;
}


/* =========================================================
   SPATIAL HASH
========================================================= */

function createSpatialHash(
    points,
    cellSize
) {

    const hash =
        new Map();


    for (
        const point
        of points
    ) {

        const x =
            Math.floor(
                point.x /
                cellSize
            );

        const y =
            Math.floor(
                point.y /
                cellSize
            );

        const z =
            Math.floor(
                point.z /
                cellSize
            );


        const key =
            `${x}:${y}:${z}`;


        if (
            !hash.has(key)
        ) {

            hash.set(
                key,
                []
            );
        }


        hash.get(key)
            .push(point);
    }


    return hash;
}


/* =========================================================
   NEAREST HASH DISTANCE
========================================================= */

function nearestDistance(
    point,
    hash,
    cellSize
) {

    const x =
        Math.floor(
            point.x /
            cellSize
        );

    const y =
        Math.floor(
            point.y /
            cellSize
        );

    const z =
        Math.floor(
            point.z /
            cellSize
        );


    let best =
        Infinity;


    for (
        let dx = -1;
        dx <= 1;
        dx++
    ) {

        for (
            let dy = -1;
            dy <= 1;
            dy++
        ) {

            for (
                let dz = -1;
                dz <= 1;
                dz++
            ) {

                const key =
                    `${x + dx}:${y + dy}:${z + dz}`;


                const bucket =
                    hash.get(key);


                if (!bucket) {
                    continue;
                }


                for (
                    const candidate
                    of bucket
                ) {

                    const distance =
                        point.distanceTo(
                            candidate
                        );


                    if (
                        distance <
                        best
                    ) {

                        best =
                            distance;
                    }
                }
            }
        }
    }


    return best;
}


/* =========================================================
   BIDIRECTIONAL SCORING
========================================================= */

function scoreTransform(
    pointsA,
    pointsB,
    transform,
    tolerance
) {

    const hashA =
        createSpatialHash(
            pointsA,
            tolerance
        );


    const hashB =
        createSpatialHash(
            pointsB,
            tolerance
        );


    const inverse =
        transform
            .clone()
            .invert();


    let inliersA = 0;
    let errorA = 0;


    const transformed =
        new THREE.Vector3();


    /*
        A → B
    */

    for (
        const point
        of pointsA
    ) {

        transformed
            .copy(point)
            .applyMatrix4(
                transform
            );


        const distance =
            nearestDistance(
                transformed,
                hashB,
                tolerance
            );


        if (
            distance <= tolerance
        ) {

            inliersA++;

            errorA +=
                distance;
        }
    }


    let inliersB = 0;
    let errorB = 0;


    /*
        B → A
    */

    for (
        const point
        of pointsB
    ) {

        transformed
            .copy(point)
            .applyMatrix4(
                inverse
            );


        const distance =
            nearestDistance(
                transformed,
                hashA,
                tolerance
            );


        if (
            distance <= tolerance
        ) {

            inliersB++;

            errorB +=
                distance;
        }
    }


    const ratioA =
        inliersA /
        pointsA.length;


    const ratioB =
        inliersB /
        pointsB.length;


    const overlap =
        (
            ratioA +
            ratioB
        ) / 2;


    const meanError =
        (
            (
                inliersA
                    ? errorA / inliersA
                    : tolerance
            ) +

            (
                inliersB
                    ? errorB / inliersB
                    : tolerance
            )
        ) / 2;


    /*
        High overlap = good.

        Low error = good.
    */

    const score =
        overlap *
        Math.exp(
            -meanError /
            tolerance
        );


    return {

        score,

        overlap,

        ratioA,

        ratioB,

        inliersA,

        inliersB,

        meanError
    };
}


/* =========================================================
   TRIANGLE VALIDATION
========================================================= */

function validTriangle(
    pointsA,
    pointsB,
    sample
) {

    const a1 =
        pointsA[sample[0].a];

    const a2 =
        pointsA[sample[1].a];

    const a3 =
        pointsA[sample[2].a];


    const b1 =
        pointsB[sample[0].b];

    const b2 =
        pointsB[sample[1].b];

    const b3 =
        pointsB[sample[2].b];


    const distancesA = [

        a1.distanceTo(a2),

        a1.distanceTo(a3),

        a2.distanceTo(a3)
    ];


    const distancesB = [

        b1.distanceTo(b2),

        b1.distanceTo(b3),

        b2.distanceTo(b3)
    ];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const relativeError =
            Math.abs(
                distancesA[i] -
                distancesB[i]
            ) /
            Math.max(
                distancesA[i],
                distancesB[i]
            );


        /*
            Reject geometrically
            impossible correspondence.
        */

        if (
            relativeError >
            0.15
        ) {

            return false;
        }
    }


    return true;
}


/* =========================================================
   RANDOM SAMPLE
========================================================= */

function randomSample(
    correspondences
) {

    const result = [];


    while (
        result.length < 3
    ) {

        const candidate =
            correspondences[
                Math.floor(
                    Math.random() *
                    correspondences.length
                )
            ];


        /*
            Make sure no two
            correspondences use the
            same point.
        */

        const duplicate =
            result.some(
                existing =>
                    existing.a === candidate.a ||
                    existing.b === candidate.b
            );


        if (!duplicate) {

            result.push(
                candidate
            );
        }
    }


    return result;
}


/* =========================================================
   MAIN RANSAC
========================================================= */

export function matchArtifacts(
    originalA,
    originalB,
    options = {}
) {

    const {

        voxelSize = 0.01,

        iterations = 2000,

        tolerance = 0.025,

        maxPoints = 1000

    } = options;


    /*
        Center both artifacts.
    */

    const centeredA =
        centerCloud(
            originalA
        );


    const centeredB =
        centerCloud(
            originalB
        );


    /*
        Downsample.
    */

    let pointsA =
        voxelDownsample(
            centeredA.points,
            voxelSize
        );


    let pointsB =
        voxelDownsample(
            centeredB.points,
            voxelSize
        );


    /*
        Browser protection.

        Don't allow huge point clouds
        to destroy performance.
    */

    if (
        pointsA.length >
        maxPoints
    ) {

        pointsA =
            pointsA
                .sort(
                    () =>
                        Math.random() -
                        0.5
                )
                .slice(
                    0,
                    maxPoints
                );
    }


    if (
        pointsB.length >
        maxPoints
    ) {

        pointsB =
            pointsB
                .sort(
                    () =>
                        Math.random() -
                        0.5
                )
                .slice(
                    0,
                    maxPoints
                );
    }


    /*
        Generate geometric
        correspondences.
    */

    const correspondences =
        createCorrespondences(
            pointsA,
            pointsB
        );


    if (
        correspondences.length <
        3
    ) {

        throw new Error(
            "Not enough geometric correspondences were found."
        );
    }


    const hypotheses = [];


    /* =========================================
       RANSAC ITERATIONS
    ========================================= */

    for (
        let iteration = 0;
        iteration < iterations;
        iteration++
    ) {

        const sample =
            randomSample(
                correspondences
            );


        /*
            Reject impossible triangles.
        */

        if (
            !validTriangle(
                pointsA,
                pointsB,
                sample
            )
        ) {

            continue;
        }


        /*
            Estimate rigid transform.
        */

        const transform =
            estimateTransform(
                pointsA,
                pointsB,
                sample
            );


        if (!transform) {
            continue;
        }


        /*
            Evaluate transform.
        */

        const score =
            scoreTransform(
                pointsA,
                pointsB,
                transform,
                tolerance
            );


        hypotheses.push({

            transform,

            ...score
        });
    }


    /*
        Strongest first.
    */

    hypotheses.sort(
        (a, b) =>
            b.score -
            a.score
    );


    /*
        Keep unique transformations.

        We don't want five nearly identical
        copies of the same hypothesis.
    */

    const unique = [];


    for (
        const hypothesis
        of hypotheses
    ) {

        const position =
            new THREE.Vector3()
                .setFromMatrixPosition(
                    hypothesis.transform
                );


        const duplicate =
            unique.some(
                existing => {

                    const existingPosition =
                        new THREE.Vector3()
                            .setFromMatrixPosition(
                                existing.transform
                            );


                    return (
                        position.distanceTo(
                            existingPosition
                        ) <
                        tolerance
                    );
                }
            );


        if (!duplicate) {

            unique.push(
                hypothesis
            );
        }


        if (
            unique.length >= 5
        ) {

            break;
        }
    }


    /*
        Restore original coordinate systems.

        Center A
            ↓
        RANSAC transform
            ↓
        Center B
    */

    const removeCenterA =
        new THREE.Matrix4()
            .makeTranslation(
                -centeredA.center.x,
                -centeredA.center.y,
                -centeredA.center.z
            );


    const restoreCenterB =
        new THREE.Matrix4()
            .makeTranslation(
                centeredB.center.x,
                centeredB.center.y,
                centeredB.center.z
            );


    const finalHypotheses =
        unique.map(
            hypothesis => {

                const transform =
                    restoreCenterB
                        .clone()
                        .multiply(
                            hypothesis.transform
                        )
                        .multiply(
                            removeCenterA
                        );


                return {

                    ...hypothesis,

                    transform
                };
            }
        );


    return {

        hypotheses:
            finalHypotheses,

        pointCountA:
            pointsA.length,

        pointCountB:
            pointsB.length,

        correspondenceCount:
            correspondences.length
    };
}