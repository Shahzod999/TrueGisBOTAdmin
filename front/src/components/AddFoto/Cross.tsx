import { ReactSVG } from "react-svg";
import "./cross.scss";

const Cross = ({ toggleComment }: { toggleComment: () => void }) => {
  return (
    <span onClick={toggleComment} className="commonCross">
      <ReactSVG src="./iconsSvg/cross.svg" />
    </span>
  );
};

export default Cross;
