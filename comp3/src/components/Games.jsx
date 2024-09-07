import { useState, useEffect } from "react";
import Game from './Game'

const PAGE_SIZE = 20;

export default function Games({games, setSelected, setScreen}) {
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
        setResults(games.filter(gameFilter));
    }

    const updateResultsDebounce = debounce(updateResults, 300);

    function queryChanged(event) {
        setQuery(event.target.value);
        updateResultsDebounce();
    }
    
    useEffect(updateResults, [games])

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="search"
                    id="searchBox"
                    placeholder="Hae pelejä..."
                    onChange={queryChanged}
                    onClick={queryChanged}
                    value={query}
                />
            </form>
            <div className="gameList">
                {
                    results
                        .sort((a, b) => new Date(b.added_to_hall_of_fame) - new Date(a.added_to_hall_of_fame))
                        .map((game, i) => <Game key={i} i={i} game={game} setScreen={setScreen} setSelected={setSelected}/>)
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