import { useState } from "react";
import Game from './Game'
import heroImg from "../../assets/images/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpeg"

const PAGE_SIZE = 20;

export default function Games({games, setSelected}) {
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")

  function prevPage() {
    setPage(page - 1);
    if (page < 0) setPage(0);
  }

  function nextPage() {
    if (!isLastPage(page)) setPage(page + 1);
  }

  function isLastPage(p) {
    return games.slice((p + 1)*PAGE_SIZE, (p + 1)*PAGE_SIZE + PAGE_SIZE).length == 0;
  }

  function lastPage() {
    let newPage = page;
    while (!isLastPage(newPage)) newPage++;
    setPage(newPage);
  }

  return (
    <>
        <div className="hero" style={{backgroundImage: {heroImg}}}>
            <div className="heroText">jhjh</div>
        </div>
        <form onSubmit={() => preventDefault()}>
            <input type="text" name="search" id="searchBox" placeholder="Hae pelejä..."/>
        </form>
        <div className="gameList">
            {
                games
                    .map((game, i) => <Game key={i} i={i} game={game}/>)
                    .slice(page*PAGE_SIZE, page*PAGE_SIZE + PAGE_SIZE)
            }
        </div>
        <div className="pagination">
            {page > 0 && <button onClick={() => setPage(0)}>&lt;</button>}
            {page > 0 && <button onClick={prevPage}>{page}</button>}
            <button className="selectedPage">{page + 1}</button>
            {isLastPage(page) || <button onClick={nextPage}>{page + 2}</button>}
            {isLastPage(page) || <button onClick={lastPage}>&gt;</button>}
        </div>
    </>
  )
};