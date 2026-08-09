import styles from "./MatchHypotheses.module.css";


export default function MatchHypotheses({
    hypotheses,
    selected,
    onSelect
}) {

    return (

        <div className={styles.grid}>

            {hypotheses.map(
                (hypothesis, index) => {

                    const active =
                        selected === hypothesis;


                    return (

                        <button
                            type="button"
                            key={index}
                            className={
                                active
                                    ? styles.cardActive
                                    : styles.card
                            }
                            onClick={() =>
                                onSelect(
                                    hypothesis
                                )
                            }
                        >

                            <span>
                                HYPOTHESIS #
                                {index + 1}
                            </span>


                            <strong>
                                {(
                                    hypothesis.score *
                                    100
                                ).toFixed(1)}
                                %
                            </strong>


                            <div>

                                <small>
                                    OVERLAP
                                </small>

                                <b>
                                    {(
                                        hypothesis.overlap *
                                        100
                                    ).toFixed(1)}
                                    %
                                </b>

                            </div>


                            <div>

                                <small>
                                    A → B
                                </small>

                                <b>
                                    {(
                                        hypothesis.ratioA *
                                        100
                                    ).toFixed(1)}
                                    %
                                </b>

                            </div>


                            <div>

                                <small>
                                    B → A
                                </small>

                                <b>
                                    {(
                                        hypothesis.ratioB *
                                        100
                                    ).toFixed(1)}
                                    %
                                </b>

                            </div>


                            <div>

                                <small>
                                    ERROR
                                </small>

                                <b>
                                    {hypothesis.meanError.toFixed(
                                        4
                                    )}
                                </b>

                            </div>

                        </button>

                    );
                }
            )}

        </div>
    );
}