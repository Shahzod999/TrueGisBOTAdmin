import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
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

  // Устанавливаем имя категории при редактировании
  const mainButton = Telegram.WebApp.MainButton;

  useEffect(() => {
    if (initialPage) {
      mainButton
        .setParams({
          text: isEdit ? "Сохранить изменения" : "Создать категорию",
          has_shine_effect: true,
        })
        .onClick(handleSubmit);
    }

    return () => {
      mainButton.offClick(handleSubmit);
    };
  }, [category, isEdit, initialPage, handleSubmit]);

  useEffect(() => {
    if (category && isEdit && initialPage) {
      setItemName(category.name);
    } else if (!initialPage) {
      mainButton.setParams({
        text: "Добавить категорию",
        has_shine_effect: true,
      });
      // Сбрасываем имя при закрытии
      setItemName("");
    }
  }, [category, isEdit, initialPage]);

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
        {/* <IconButton
          text={isEdit ? "Сохранить изменения" : "Добавить категорию"}
          styleName="linkColor"
          onClick={handleSubmit}
        /> */}
      </div>
    </BottomSheet>
  );
};

export default AddNewCategory;
