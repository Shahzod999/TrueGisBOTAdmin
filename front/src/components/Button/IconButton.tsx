import { ReactSVG } from "react-svg";
import styles from "./Button.module.scss";
import { classNames } from "../../utils/classNames";

interface IconButtonProps {
  icon?: string;
  text: string;
  styleName?: string; // Позволяет передавать стили от родителя
  style?: React.CSSProperties; // Позволяет передавать inline-стили
  onClick?: () => void;
}

const IconButton = ({
  icon,
  text,
  styleName,
  style,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      className={classNames(styles.button, styleName && styles[styleName])}
      style={style}
      onClick={onClick}>
      <ReactSVG src={icon || ""} />
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
