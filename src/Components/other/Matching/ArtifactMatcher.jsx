import { useState } from "react";
import { useForm } from "react-hook-form";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import ModelViewer from "./ModelViewer";
import MatchHypotheses from "./MatchHypotheses";

import {
    extractVertices,
    matchArtifacts
} from "./ransac";

import styles from "./ArtifactMatcher.module.css";


export default function ArtifactMatcher() {

    const {
        register,
        handleSubmit,
        watch
    } = useForm();


    const fileA = watch("fileA")?.[0];
    const fileB = watch("fileB")?.[0];


    const [objectA, setObjectA] =
        useState(null);

    const [objectB, setObjectB] =
        useState(null);


    const [hypotheses, setHypotheses] =
        useState([]);

    const [selectedHypothesis, setSelectedHypothesis] =
        useState(null);


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    /*
        Load an OBJ immediately when the
        user selects it.
    */

    async function handleFileChange(
        event,
        setObject
    ) {

        const file =
            event.target.files?.[0];

        if (!file) return;


        try {

            setError(null);

            const text =
                await file.text();

            const loader =
                new OBJLoader();

            const object =
                loader.parse(text);

            setObject(object);

        } catch (err) {

            console.error(
                "OBJ loading error:",
                err
            );

            setError(
                "Could not load the OBJ file."
            );
        }
    }


    /*
        Run the actual matching.

        Notice that we DON'T load the OBJ
        here anymore.

        The models already exist in state.
    */

    async function runMatching() {

        if (!objectA || !objectB) {

            setError(
                "Please import both artifact OBJ files first."
            );

            return;
        }


        setLoading(true);

        setError(null);

        setHypotheses([]);

        setSelectedHypothesis(null);


        /*
            Give the browser a chance to render
            the loading state before doing the
            expensive computation.
        */

        await new Promise(
            resolve => setTimeout(resolve, 50)
        );


        try {

            const pointsA =
                extractVertices(objectA);

            const pointsB =
                extractVertices(objectB);


            if (pointsA.length < 3) {

                throw new Error(
                    "Artifact A does not contain enough vertices."
                );
            }


            if (pointsB.length < 3) {

                throw new Error(
                    "Artifact B does not contain enough vertices."
                );
            }


            console.log(
                `Artifact A: ${pointsA.length} vertices`
            );

            console.log(
                `Artifact B: ${pointsB.length} vertices`
            );


            /*
                Run RANSAC.
            */

            const result =
                matchArtifacts(
                    pointsA,
                    pointsB,
                    {
                        /*
                            Change this depending on
                            the scale of your OBJ files.
                        */

                        voxelSize: 0.01,

                        iterations: 2000,

                        tolerance: 0.025,

                        maxPoints: 1000
                    }
                );


            console.log(
                "Matching result:",
                result
            );


            setHypotheses(
                result.hypotheses
            );


            if (
                result.hypotheses.length > 0
            ) {

                setSelectedHypothesis(
                    result.hypotheses[0]
                );
            }


        } catch (err) {

            console.error(
                "Matching error:",
                err
            );

            setError(
                err.message ||
                "Artifact matching failed."
            );

        } finally {

            setLoading(false);
        }
    }


    /*
        react-hook-form isn't really necessary
        for the button anymore, but keeping the
        form makes it easy to expand later.
    */

    function onSubmit(event) {

        event.preventDefault();

        runMatching();
    }


    return (

        <main className={styles.page}>

            {/* =====================================
                HEADER
            ====================================== */}

            <header className={styles.header}>

                <div>

                    <p className={styles.eyebrow}>
                        ARCHAEOLOGICAL ANALYSIS
                    </p>

                    <h1>
                        Artifact Matcher
                    </h1>

                    <p className={styles.subtitle}>
                        Geometric registration of
                        fragmented archaeological objects
                    </p>

                </div>


                <div className={styles.status}>

                    <span />

                    LOCAL PROCESSING

                </div>

            </header>


            {/* =====================================
                UPLOAD SECTION
            ====================================== */}

            <form onSubmit={onSubmit}>

                <section className={styles.uploadGrid}>

                    {/* ================================
                        ARTIFACT A
                    ================================= */}

                    <div className={styles.fragmentCard}>

                        <div className={styles.cardHeader}>

                            <div>

                                <span>
                                    FRAGMENT A
                                </span>

                                <h2>

                                    {fileA?.name ||
                                        "No artifact selected"}

                                </h2>

                            </div>


                            <b>
                                01
                            </b>

                        </div>


                        <ModelViewer
                            object={objectA}
                        />


                        <label
                            className={
                                styles.dropzone
                            }
                        >

                            <div
                                className={
                                    styles.uploadIcon
                                }
                            >
                                +
                            </div>


                            <div>

                                <strong>
                                    Drop OBJ file here
                                </strong>

                                <small>
                                    or click to browse
                                </small>

                            </div>


                            <input
                                type="file"
                                accept=".obj"
                                {...register("fileA")}
                                onChange={(event) => {

                                    register(
                                        "fileA"
                                    ).onChange(event);

                                    handleFileChange(
                                        event,
                                        setObjectA
                                    );
                                }}
                            />

                        </label>

                    </div>


                    {/* ================================
                        ARTIFACT B
                    ================================= */}

                    <div className={styles.fragmentCard}>

                        <div className={styles.cardHeader}>

                            <div>

                                <span>
                                    FRAGMENT B
                                </span>

                                <h2>

                                    {fileB?.name ||
                                        "No artifact selected"}

                                </h2>

                            </div>


                            <b>
                                02
                            </b>

                        </div>


                        <ModelViewer
                            object={objectB}
                        />


                        <label
                            className={
                                styles.dropzone
                            }
                        >

                            <div
                                className={
                                    styles.uploadIcon
                                }
                            >
                                +
                            </div>


                            <div>

                                <strong>
                                    Drop OBJ file here
                                </strong>

                                <small>
                                    or click to browse
                                </small>

                            </div>


                            <input
                                type="file"
                                accept=".obj"
                                {...register("fileB")}
                                onChange={(event) => {

                                    register(
                                        "fileB"
                                    ).onChange(event);

                                    handleFileChange(
                                        event,
                                        setObjectB
                                    );
                                }}
                            />

                        </label>

                    </div>

                </section>


                {/* =================================
                    CONTROL BAR
                ================================== */}

                <section
                    className={
                        styles.controlBar
                    }
                >

                    <div>

                        <span
                            className={
                                styles.controlLabel
                            }
                        >
                            REGISTRATION METHOD
                        </span>


                        <strong>
                            Multi-point RANSAC
                        </strong>

                    </div>


                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !objectA ||
                            !objectB
                        }
                    >

                        {loading
                            ? "Analyzing geometry..."
                            : "Run Artifact Matching"
                        }


                        <span>
                            →
                        </span>

                    </button>

                </section>

            </form>


            {/* =====================================
                ERROR
            ====================================== */}

            {error && (

                <div className={styles.error}>
                    {error}
                </div>

            )}


            {/* =====================================
                RESULTS
            ====================================== */}

            {hypotheses.length > 0 && (

                <section
                    className={
                        styles.results
                    }
                >

                    <div
                        className={
                            styles.sectionTitle
                        }
                    >

                        <div>

                            <span>
                                ANALYSIS RESULTS
                            </span>

                            <h2>
                                Match hypotheses
                            </h2>

                        </div>


                        <p>
                            {hypotheses.length}
                            {" "}
                            candidate alignments
                        </p>

                    </div>


                    <MatchHypotheses
                        hypotheses={hypotheses}
                        selected={
                            selectedHypothesis
                        }
                        onSelect={
                            setSelectedHypothesis
                        }
                    />


                    {/* =================================
                        ALIGNMENT VIEWER
                    ================================== */}

                    {selectedHypothesis && (

                        <div
                            className={
                                styles.alignment
                            }
                        >

                            <div
                                className={
                                    styles.alignmentHeader
                                }
                            >

                                <div>

                                    <span>
                                        SELECTED ALIGNMENT
                                    </span>

                                    <h2>
                                        {(
                                            selectedHypothesis.score *
                                            100
                                        ).toFixed(1)}
                                        %
                                        {" "}
                                        confidence
                                    </h2>

                                </div>


                                <div>

                                    Error&nbsp;

                                    {selectedHypothesis.meanError.toFixed(
                                        4
                                    )}

                                </div>

                            </div>


                            <ModelViewer
                                object={objectB}
                                overlayObject={objectA}
                                transform={
                                    selectedHypothesis.transform
                                }
                                overlay
                            />

                        </div>

                    )}

                </section>

            )}

        </main>
    );
}