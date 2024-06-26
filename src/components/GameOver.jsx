export default function GameOver({winner, rematch}) {
    return (
        <div id="game-over">
            <h2>GAME OVER!</h2>
            {winner && <p>{winner} WIN</p>}
            {!winner && <p>It&apos;s a draw!</p>}
            <p>
                <button onClick={rematch}>
                    REMATCH!
                </button>
            </p>
        </div>
    );
}