import Icon from "../icons/wrapper"
import { playOrPause } from "./logic"


const PlayPause = () => (
    <button className="player-button" onClick={() => playOrPause()}>
        <Icon icon="play" width={20} height={23} />
    </button>
)


export default PlayPause