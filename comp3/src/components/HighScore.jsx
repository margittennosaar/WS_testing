export default function HighScore({score, pos}) {
    return (
        <div className={`highScore ${pos <= 3 ? 'top' : ''}`}>
            <h3><span id={`position${pos}`}>{pos}.</span> {score.username}</h3>
            <div>
                <p>{score.score}</p>
                <p>{new Date(score.date_time).toDateString()}</p>
            </div>
        </div>
    )
}