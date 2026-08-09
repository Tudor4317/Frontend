import {
    useEffect,
    useRef
} from "react";

import {
    Canvas,
    useThree
} from "@react-three/fiber";

import {
    OrbitControls,
    Environment
} from "@react-three/drei";

import * as THREE from "three";

import styles from "./ModelViewer.module.css";


/* =========================================
   MODEL
========================================= */

function Model({
    object,
    overlayObject,
    transform
}) {

    if (!object) {
        return null;
    }


    /*
        Clone the base object so that
        Three.js transformations don't
        modify the React state object.
    */

    const base =
        object.clone(true);


    base.traverse((child) => {

        if (!child.isMesh) return;


        child.material =
            new THREE.MeshStandardMaterial({
                color: "#61dff5",

                roughness: 0.65,

                metalness: 0.1
            });
    });


    /*
        Optional second artifact.

        Used by the alignment viewer.
    */

    if (overlayObject) {

        const overlay =
            overlayObject.clone(true);


        overlay.traverse((child) => {

            if (!child.isMesh) return;


            child.material =
                new THREE.MeshStandardMaterial({

                    color: "#7468ff",

                    transparent: true,

                    opacity: 0.5,

                    roughness: 0.65,

                    metalness: 0.05
                });
        });


        /*
            Apply the RANSAC transformation
            to artifact A.
        */

        if (transform) {

            overlay.applyMatrix4(
                transform
            );
        }


        base.add(overlay);
    }


    return (
        <primitive
            object={base}
        />
    );
}


/* =========================================
   CAMERA
========================================= */

function CameraController({
    object,
    overlayObject
}) {

    const {
        camera
    } = useThree();


    const controlsRef =
        useRef();


    useEffect(() => {

        if (!object) return;


        /*
            Calculate bounding box.
        */

        const box =
            new THREE.Box3()
                .setFromObject(
                    object
                );


        /*
            If there is an overlay,
            include it too.
        */

        if (overlayObject) {

            const overlayBox =
                new THREE.Box3()
                    .setFromObject(
                        overlayObject
                    );


            box.union(
                overlayBox
            );
        }


        const center =
            new THREE.Vector3();

        box.getCenter(
            center
        );


        const size =
            new THREE.Vector3();

        box.getSize(
            size
        );


        const maxDimension =
            Math.max(
                size.x,
                size.y,
                size.z
            );


        /*
            Camera distance.

            Smaller number = closer.
        */

        const distance =
            maxDimension * 1.35;


        /*
            Put camera on Z axis
            relative to the artifact.
        */

        camera.position.set(
            center.x,
            center.y,
            center.z + distance
        );


        /*
            Narrower FOV gives a more
            "zoomed in" appearance.
        */

        camera.fov = 35;


        /*
            Prevent clipping.
        */

        camera.near =
            Math.max(
                maxDimension / 1000,
                0.001
            );


        camera.far =
            Math.max(
                maxDimension * 100,
                100
            );


        camera.updateProjectionMatrix();


        /*
            Make OrbitControls rotate
            around the artifact rather
            than the world origin.
        */

        if (controlsRef.current) {

            controlsRef.current.target.copy(
                center
            );

            controlsRef.current.update();
        }

    }, [
        object,
        overlayObject,
        camera
    ]);


    return (

        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
        />

    );
}


/* =========================================
   VIEWER
========================================= */

export default function ModelViewer({
    object,
    overlayObject,
    transform
}) {

    return (

        <div
            className={
                styles.viewer
            }
        >

            <Canvas
                camera={{
                    position: [
                        0,
                        0,
                        3
                    ],

                    fov: 35
                }}

                dpr={[1, 2]}
            >

                {/* Lighting */}

                <ambientLight
                    intensity={1.5}
                />


                <directionalLight
                    position={[
                        5,
                        5,
                        5
                    ]}
                    intensity={3}
                />


                <directionalLight
                    position={[
                        -5,
                        -3,
                        -5
                    ]}
                    intensity={1}
                />


                <Environment
                    preset="studio"
                />


                {/* Artifact */}

                <Model
                    object={object}
                    overlayObject={
                        overlayObject
                    }
                    transform={
                        transform
                    }
                />


                {/* Camera */}

                <CameraController
                    object={object}
                    overlayObject={
                        overlayObject
                    }
                />

            </Canvas>

        </div>
    );
}