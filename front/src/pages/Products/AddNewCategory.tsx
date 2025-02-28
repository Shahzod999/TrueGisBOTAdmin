import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
import IconButton from "../../components/Button/IconButton";
import { useState } from "react";

interface Props {
  onClick: (itemName: string) => void;
  state: string;
}

const AddNewCategory = ({ onClick, state }: Props) => {
  const { getParam, setParam } = useURLState();
  const [itemName, setItemName] = useState("");
  const initialPage = Boolean(getParam(state));

  return (
    <BottomSheet isOpen={initialPage} onClose={() => setParam(state, false)}>
      <div className={styles.addCategorySheet}>
        <h4>Своя категория</h4>
        <div>
          <input
            type="text"
            placeholder="Название категории"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <IconButton
          text="Добавить категорию"
          styleName="linkColor"
          onClick={() => onClick(itemName)}
        />
      </div>
    </BottomSheet>
  );
};

export default AddNewCategory;
