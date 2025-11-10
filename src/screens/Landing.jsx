import { useNavigate } from "react-router-dom"
import { PlayButton } from "../components/PlayButton"

export const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={'/chessBoard.webp'} className="max-w-96" />
                    </div>
                    <div className="pt-16">
                        <div className="flex justify-center text-center">
                            <h1 className="text-4xl font-bold text-white">Play Chess Online on the #2 site!</h1>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <PlayButton onClick={() => { navigate('/game') }} classes = "bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold text-2xl py-4 px-8 rounded">Play Online</PlayButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}