
export const PlayerCard = ({isOpponent}) => {
    return (
    <div className="text-white">
        {isOpponent ? <h2>Opponent</h2> : <h2>You</h2>}
    </div>
    );
}