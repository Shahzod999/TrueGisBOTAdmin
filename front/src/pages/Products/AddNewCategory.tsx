import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
import IconButton from "../../components/Button/IconButton";
import { useState, useEffect } from "react";
import { singleCategoryType } from "../../types/categoryTypes";

interface Props {
  onClick: (itemName: string, categoryId?: string) => void;
  state: string;
  category?: singleCategoryType | null;
  isEdit?: boolean;
}

const AddNewCategory = ({
  onClick,
  state,
  category,
  isEdit = false,
}: Props) => {
  const { getParam, setParam } = useURLState();
  const [itemName, setItemName] = useState("");
  const initialPage = Boolean(getParam(state));

  // Устанавливаем имя категории при редактировании
  useEffect(() => {
    if (category && isEdit && initialPage) {
      setItemName(category.name);
    } else if (!initialPage) {
      // Сбрасываем имя при закрытии
      setItemName("");
    }
  }, [category, isEdit, initialPage]);

  const handleSubmit = () => {
    if (itemName.trim()) {
      if (isEdit && category) {
        onClick(itemName, category._id);
      } else {
        onClick(itemName);
      }
      setItemName("");
      setParam(state, false);
    }
  };

  return (
    <BottomSheet isOpen={initialPage} onClose={() => setParam(state, false)}>
      <div className={styles.addCategorySheet}>
        <h4>{isEdit ? "Изменить категорию" : "Своя категория"}</h4>
        <div>
          <input
            type="text"
            placeholder="Введите категорию"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            autoFocus
          />
        </div>
        <IconButton
          text={isEdit ? "Сохранить изменения" : "Добавить категорию"}
          styleName="linkColor"
          onClick={handleSubmit}
        />
      </div>
    </BottomSheet>
  );
};

export default AddNewCategory;
