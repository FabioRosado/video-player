import { useEffect } from "react"
import "./video.css"
import PlayPause from "../components/player/play"

import { playOrPause } from "./player/logic"

const Video = () => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "k") {
               playOrPause()
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }

    })
    
    return(
        <div className="relative">
            <video className="video-player" id="video-player"  controls>
                <source src="/Big_Buck_Bunny_1080_10s_5MB.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="video-controls">
                <PlayPause />
            </div>

        </div>
    )
}

export default Video