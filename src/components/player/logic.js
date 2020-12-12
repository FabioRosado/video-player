
const playOrPause = () => {
    const player = document.getElementById("video-player")
    if (player.paused) {
        player.play()
    } else {
        player.pause()
    }
}


export {
    playOrPause
}