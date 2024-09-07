import { useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../assets/images/curtis-berry-jkj3__wfDAk-unsplash.jpeg"

export default function Game({i, game}) {

  return (
    <Link to={`/game`} onClick={() => setSelected(i)}>
        <div className="gameInfo">
            <div>
                <img src={placeholder} alt="Pelin kuva" />
            </div>
            <div className="gameHeader">
                <div className="gameTitle">
                    <h2>{game.game_name.fi}</h2>
                    <p>{game.maker}, {game.launched_year}</p>
                </div>
                <p className="gameYear">{game.description.fi}</p>
            </div>
        </div>
    </Link>
  )
};