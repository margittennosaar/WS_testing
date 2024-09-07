

import { useState, useEffect } from "react";
import HighScore from './HighScore'
import placeholder from "../../assets/images/curtis-berry-jkj3__wfDAk-unsplash.jpeg"

const PAGE_SIZE = 20;

export default function GameInfo({game}) {
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    function gameFilter(game) {
        if (!query.length) return true;
        return JSON.stringify(game).toLowerCase().includes(query.toLowerCase());
    }

    // Pagination
    function prevPage() {
        setPage(page - 1);
        if (page < 0) setPage(0);
    }

    function nextPage() {
        if (!isLastPage(page)) setPage(page + 1);
    }

    function isLastPage(p) {
        return results
            .slice((p + 1)*PAGE_SIZE, (p + 1)*PAGE_SIZE + PAGE_SIZE)
            .length == 0;
    }

    function lastPage() {
        let newPage = page;
        while (!isLastPage(newPage)) newPage++;
        setPage(newPage);
    }

    // Search
    function debounce(func, waitTime) {
        var timeout;

        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, waitTime);
        };
    };

    function updateResults() {
        setPage(0);
        setResults(game.hall_of_fame.filter(gameFilter));
    }

    const updateResultsDebounce = debounce(updateResults, 300);

    function queryChanged(event) {
        setQuery(event.target.value);
        updateResultsDebounce();
    }

    useEffect(updateResults, [game.hall_of_fame])

    return (
        <>
            <div className="gameInfoSingle">
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
            <div className="highScores">
                <h2>Huipputulokset</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="search"
                        id="searchBox"
                        placeholder="Hae pelaajia..."
                        onChange={queryChanged}
                        value={query}
                    />
                </form>
                {
                    results
                        .sort((a, b) => b.score - a.score)
                        .map((score, i) => <HighScore key={i} pos={i + 1} score={score}/>)
                        .slice(page*PAGE_SIZE, page*PAGE_SIZE + PAGE_SIZE)
                }
            </div>
            <div className="pagination">
                {page > 1 && <button className="clickable" onClick={() => setPage(0)}>&lt;</button>}
                {page > 0 && <button className="clickable" onClick={prevPage}>{page}</button>}
                <button className="clickable selectedPage">{page + 1}</button>
                {isLastPage(page) || <button className="clickable" onClick={nextPage}>{page + 2}</button>}
                {isLastPage(page + 1) || <button className="clickable" onClick={lastPage}>&gt;</button>}
            </div>
        </>
    )
};