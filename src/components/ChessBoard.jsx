import { PlayerCard } from "./playerCard"

export const ChessBoard = ({ board }) => {
    return (
        <div className="flex flex-col gap-4">
            {/**Opponent */}
            <PlayerCard isOpponent = {true} />

            {/**Chess Board */}
            <div>
                {
                    board.map((row, i) => {
                        return <div key={i} className="flex">
                            {row.map((square, j) => {
                                return <div key={j} className={`w-16 h-16 ${(i + j) % 2 == 0 ? 'bg-green-700' : 'bg-white'}`}>
                                    <div className="flex justify-center h-full items-center">
                                        {square ? square.type : ""}
                                    </div>
                                </div>
                            })}
                        </div>
                    })
                }
            </div>


            {/**Player */}
            <PlayerCard isOpponent = {false} />

        </div>
    )
}