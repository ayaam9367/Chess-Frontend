import { useCallback, useEffect, useRef, useState } from "react"
import { ChessBoard } from "../components/ChessBoard"
import { PlayButton } from "../components/PlayButton"
import { useSocket } from "../hooks/useSockets"
import { general as generalMessages } from "../utilities/socketMessages"
import { notifications as notificationMessages } from "../utilities/socketMessages"
import { Chess } from "chess.js"

export const Game = () => {
    const socket = useSocket();
    const chessRef = useRef();
    if (!chessRef.current) {
        chessRef.current = new Chess();
    }

    const [board, setBoard] = useState(chessRef.current.board());

    const handleSocketMessages = useCallback((message) => {
        switch (message.type) {
            case generalMessages.INIT_GAME:
                chessRef.current = new Chess();
                setBoard(chessRef.current.board());
                console.log('Game initialized');
                break;

            case generalMessages.MOVE: {
                if (!chessRef.current) return console.warn('No game initialized yet');
                const move = message.move;
                chessRef.current.move(move);
                setBoard(chessRef.current.board());
                console.log('Move Made: ', move);
            }
                break;

            case notificationMessages.WAITING:
                console.log('waiting');
                break;

            case notificationMessages.ERROR:
                console.log('error');
                break;

            case notificationMessages.START_GAME:
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
    }, [])

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(`Message Recieved : `, message);
            handleSocketMessages(message);
        }

        //unmounting the handler
        return () => {
            socket.onmessage = null
        }
    }, [socket, handleSocketMessages])

    if (!socket) return <div>Connecting...</div>
    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 w-full flex justify-center">
                        <ChessBoard board={board} />
                    </div>

                    <div className="col-span-2 text-white w-full flex justify-center items-center">
                        <PlayButton onClick={() => { }} classes={`bg-green-500 hover:bg-green-700 hover:cursor-pointer py-3 md:py-4 
                        px-6 md:px-10 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-lg md:text-xl  font-bold `}>
                            Play
                        </PlayButton>
                    </div>
                </div>
            </div>
        </div>
    )
}