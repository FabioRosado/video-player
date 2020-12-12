import { ICONS } from "./icons-list"

const Icon = (props) => {
    const { icon, width, height } = props

    return(
        <svg width={width} height={height} viewBox={ICONS[icon].viewBox}>
            <path d={ICONS[icon].path} transform={ICONS[icon].transform} fill="#46beaf" />
        </svg>
    )
}

export default Icon