
const playOrPause = (player) => {
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
    

export {
    playOrPause,
    getSeconds,
}