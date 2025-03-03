import { ReactSVG } from "react-svg";
import styles from "./Button.module.scss";
import { classNames } from "../../utils/classNames";

interface IconButtonProps {
  icon?: string;
  text: string;
  styleName?: string; // Позволяет передавать стили от родителя
  style?: React.CSSProperties; // Позволяет передавать inline-стили
  onClick?: () => void;
  isLoading?: boolean;
}

const IconButton = ({
  icon,
  text,
  styleName,
  style,
  onClick,
  isLoading,
}: IconButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styleName && styles[styleName],
        isLoading && styles.loading,
      )}
      style={style}
      disabled={isLoading}
      onClick={onClick}>
      <ReactSVG src={icon || ""} />
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
