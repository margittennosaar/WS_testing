import placeholder from "../../assets/images/curtis-berry-jkj3__wfDAk-unsplash.jpeg"
import screens from "../screens.js"

export default function Game({i, game, setSelected, setScreen}) {
    function selectGame() {
        setSelected(i);
        setScreen(screens.GAME_INFO);
    }

    return (
        <div className="gameInfo clickable" onClick={selectGame}>
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
    )
};