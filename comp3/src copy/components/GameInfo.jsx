

import { useState } from "react";
import placeholder from "../../assets/images/curtis-berry-jkj3__wfDAk-unsplash.jpeg"

export default function GameInfo({games}) {
    let { gameId } = useParams();

    if (!games) return (
        <>a</>
    )

    return (
        <>
            <div className="gameInfo">
                <div>
                    <img src={placeholder} alt="Pelin kuva" />
                </div>
                <div className="gameHeader">
                    <div className="gameTitle">
                        <h2>{games[gameId].game_name.fi}</h2>
                        <p>{games[gameId].maker}, {games[gameId].launched_year}</p>
                    </div>
                    <p className="gameYear">{games[gameId].description.fi}</p>
                </div>
            </div>
            <div className="highScores">
                a
            </div>
        </>
    )
};