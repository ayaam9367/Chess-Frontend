import { useEffect, useState } from "react"
import { ChessBoard } from "../components/ChessBoard"
import { PlayButton } from "../components/PlayButton"
import { useSocket } from "../hooks/useSockets"
import { general as generalMessages } from "../utilities/socketMessages"
import { Chess } from "chess.js"

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message) {
                case generalMessages.INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log('Game initialized');
                    break;

                case generalMessages.MOVE: {
                    const move = message.move;
                    chess.move(move);
                    setBoard(chess.board);
                    console.log('Move Made');
                }
                    break;

                case generalMessages.WAITING:
                    console.log('waiting');
                    break;

                case generalMessages.ERROR:
                    console.log('error');
                    break;

                case generalMessages.START_GAME:
                    console.log('Game started');
                    break;

                case generalMessages.GAME_OVER:
                    console.log('Game Over');
                    break;

                case generalMessages.GAME_DRAW:
                    console.log('Game Draw');
                    break;

                default:
                    break;
            }
        }
    }, [socket])
    if (!socket) return <div>Connecting...</div>
    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 w-full flex justify-center">
                        <ChessBoard board = {board} />
                    </div>

                    <div className="col-span-2 text-white w-full bg-green-300">
                        <PlayButton onClick={() => { }}>
                            Play
                        </PlayButton>
                    </div>
                </div>
            </div>
        </div>
    )
}