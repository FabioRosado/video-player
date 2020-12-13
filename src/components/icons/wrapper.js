import { ICONS } from "./icons-list";

const Icon = (props) => {
  const { id, icon, width, height } = props;

  return (
    <svg width={width} height={height} viewBox={ICONS[icon].viewBox}>
      <path
        id={id ? id : "control-icon"}
        d={ICONS[icon].path}
        transform={ICONS[icon].transform}
        fill="#46beaf"
      />
    </svg>
  );
};

export default Icon;
