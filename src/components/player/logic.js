
const playOrPause = () => {

    const player = document.getElementById("video-player")

    if (player.paused) {
        player.play()
    } else {
        player.pause()
    }
}


const getSeconds = (timeInSeconds) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8)

    return result.substr(6, 2)

}

const getMilliseconds = (seconds) => {
    return Math.round(seconds * 1000)
}
    

export {
    playOrPause,
    getSeconds,
    getMilliseconds
}