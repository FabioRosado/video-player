import React, { useEffect, useState, useRef } from "react"
import "./video.css"
import Icon from "../components/icons/wrapper"

import { playOrPause, getSeconds, getMilliseconds } from "./player/logic"

const VideoPlayer = () => {
    const [icon, setIcon] = useState("play")
    const [loop, setLoop] = useState(false)
    const [duration, setDuration] = useState("00")
    const [played, setPlayed] = useState(0)
    const [counter, setCount] = useState(0)
    
    const videoRef = useRef()
    const player = document.getElementById("video-player")
    


    const playPause = () => {
        const player = document.getElementById("video-player")

        player.paused ? setIcon("paused") : setIcon("play")
        playOrPause()
    }
    
    const toggleFullscreen = (player) => {
        if (player) {
            player.requestFullscreen()
        }
    }

    
    
    const getCurrentTime = () => {
        setPlayed(videoRef.current.currentTime)

        if (getSeconds(videoRef.current.currentTime) > 9) {
            setCount(counter + 1)
        }
    }
    
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "k") {
                playPause(player)
            }
            if (event.key === "l") {
                setLoop(!loop)
            }
            if (event.key === "f") {
                toggleFullscreen(player)
            }
        }
        
        if (player) {
            setDuration(videoRef.current.duration)
            window.addEventListener("keydown", handleKeyPress)
            player.addEventListener("timeupdate", getCurrentTime)
        }


        return () => {
            if(player) {
                player.removeEventListener("timeupdate", getCurrentTime)
                window.removeEventListener("keydown", handleKeyPress)
            }
        }

    }, [videoRef, player, loop, counter])
    
    console.log(counter)
    return(
        <div className="relative">
            {played > 3.5 && played < 8.5 && counter < 1 && 
                <img className="image-1" src="/images/image1.png" alt="banana" />
            }

            {played > 6 && played < 8 && counter < 3 && <img className="image-2" src="/images/image2.png" alt="remote" /> }
            {played > 7 && played < 8.5 && counter < 4 && <img className="image-3" src="/images/image3.png" alt="fire" />}

            <video ref={videoRef} className="video-player" id="video-player"  controls loop={loop}>
                <source src="/Big_Buck_Bunny_1080_10s_5MB.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="video-controls">
                <div className="left-side">
                    <button className="player-button" aria-label="Play/Pause (shortcut k)" data-title="Play (k)" onClick={() => playPause()}>
                        <Icon icon={icon === "play" ? "play" : "pause"} width={20} height={23} />
                    </button>

                    <button className="player-button disabled-button" aria-label="Volume Button" disabled>
                        <Icon icon="volume" id="disabled-button" width={27} height={23} />
                    </button>
                </div>

                <div className="center">
                    <div className="time">
                        <time id="time-elapsed">{`00:${getSeconds(played)}`}</time>
                        <span> / </span>
                        <time id="duration">{`00:${duration}`}</time>
                    </div>

                </div>


                <div className="right-side">
                    <button className="player-button" aria-label="Toggle video loopback (shorcut l)" onClick={() => setLoop(!loop)}>
                        <Icon icon="loop" width={27} height={23} />
                    </button>
                    <button className="player-button" aria-label="Toggle fullscreen (shorcut f)" onClick={() => toggleFullscreen(player)}>
                        <Icon icon="expand" width={27} height={23} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default VideoPlayer