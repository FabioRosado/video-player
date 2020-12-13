import React, { useEffect, useState, useRef } from "react"
import "./video.css"
import Icon from "../components/icons/wrapper"
import { playOrPause, getSeconds } from "./player/logic"

const VideoPlayer = () => {
    const [loop, setLoop] = useState(false)
    const [duration, setDuration] = useState("00")
    const [played, setPlayed] = useState(0)
    const [counter, setCount] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    
    const player = useRef()
    const progressBarRef = useRef()

    const videoIsPlaying = () => {
        setDuration(player.current.duration)
        setIsPlaying(true)
    }
    
    const videoIsPaused = () => {
        setIsPlaying(false)
    }
    
    const toggleFullscreen = (player) => {
        player.current.requestFullscreen()
    }

    const incrementCounter = () => {
        if (Math.round(player.current.currentTime, 2) > 9) {
            if (loop) {
                setCount(counter + .8)
            } else {
                setCount(counter + .5)
            }
        }        
    }

    const toggleLoop = () => {
        setLoop(!loop)
        
    }

    const getCurrentTime = () => {
        setPlayed(player.current.currentTime)
        incrementCounter()
    }


    const updateSeek = (event) => {
        const skipTo = Math.round((event.nativeEvent.offsetX) * parseInt(progressBarRef.current.offsetWidth, 10)/10000)
        player.current.currentTime = skipTo
    }
    
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "k") {
                playOrPause(player.current)
            }
            if (event.key === "l") {
               toggleLoop()
            }
            if (event.key === "f") {
                toggleFullscreen(player)
            }
        }

        
        if (player) {
            window.addEventListener("keydown", handleKeyPress)
            
        }

        return () => {
            if(player) {
                window.removeEventListener("keydown", handleKeyPress)
            }
        }

    }, [player])


    return(
        <div className="relative">
            {played > 3.5 && played < 8.5 && counter < 1 && <img className="image-1" src="/images/image1.png" alt="banana" />}
            {played > 6 && played < 8 && counter < 3 && <img className="image-2" src="/images/image2.png" alt="remote" /> }
            {played > 7 && played < 8.5 && counter < 4 && <img className="image-3" src="/images/image3.png" alt="fire" />}

            <video 
                ref={player} 
                id="video-player" 
                loop={loop} 
                onClick={() => playOrPause(player.current)} 
                onTimeUpdate={() => getCurrentTime()}
                onPause={() => videoIsPaused()}
                onPlay={() => videoIsPlaying()}
            >
                <source src="/Big_Buck_Bunny_1080_10s_5MB.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div id="video-controls">
                <div className="left-side">
                    <button className="player-button" title="Play/Pause (k)" aria-label="Play/Pause (shortcut k)" onClick={() => playOrPause(player.current)}>
                        <Icon icon={isPlaying ? "pause" : "play"} width={20} height={23} />
                    </button>

                    <button className="player-button disabled-button" title="Volume (disabled)" aria-label="Volume Button" disabled>
                        <Icon icon="volume" id="disabled-button" width={27} height={23} />
                    </button>
                </div>

                <div className="center-controls">
                    <div className="video-progress">
                        <div id="progress-bar" ref={progressBarRef} onClick={(e) => updateSeek(e)}>
                            <div className="progress"  style={{width: `${played * 10}%`}} />
                        </div>
                    </div>

                    <div className="time">
                        <time id="time-elapsed">{`00:${getSeconds(played)}`}</time>
                        <span> / </span>
                        <time id="duration">{`00:${duration}`}</time>
                    </div>

                </div>

                <div className="right-side">
                    <button className="player-button" title="Loop (l)" aria-label="Toggle video loopback (shorcut l)" onClick={() => toggleLoop()}>
                        <Icon icon="loop" width={27} height={23} />
                    </button>
                    <button className="player-button" title="Fullscreen (f)" aria-label="Toggle fullscreen (shorcut f)" onClick={() => toggleFullscreen(player)}>
                        <Icon icon="expand" width={27} height={23} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default VideoPlayer