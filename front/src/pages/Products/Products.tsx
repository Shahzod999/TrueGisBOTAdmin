import Lottie from "lottie-react";
import search from "../../../public/utya/search.json";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
import {
  useAddNewCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../features/products/productsApi";
import Loading from "../../components/Loading/Loading";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IconTextArrow from "../../components/IconTextArrow/IconTextArrow";
import { useNavigate } from "react-router";
import AddNewCategory from "./AddNewCategory";
import { singleCategoryType } from "../../types/categoryTypes";
import { selectedCompany } from "../../features/company/companySlice";
import SwipeableItem from "../../components/SwipeableItem/SwipeableItem";
import { useEffect, useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

const Products = () => {
  const navigate = useNavigate();
  const { setParam } = useURLState();
  const company = useAppSelector(selectedCompany);
  const { data: category } = useGetCategoryQuery({
    company_id: company?._id,
  });
  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();

  const dispatch = useAppDispatch();

  // Состояние для модальных окон
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<singleCategoryType | null>(null);

  const handleAddCategory = async (itemName: string) => {
    try {
      await addNewCategory({
        name: itemName,
      }).unwrap();
      dispatch(succesToast("Категория успешно добавлена"));
      setParam("addNewCategory", false);
    } catch (error) {
      console.log(error);
      dispatch(errorToast("Категория не добавлена"));
    }
  };

  const handleCategoryInside = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  // Обработчик для открытия модального окна редактирования
  const handleEditCategory = (category: singleCategoryType) => {
    setSelectedCategory(category);
    setParam("editCategory", true);
  };

  // Обработчик для открытия модального окна подтверждения удаления
  const handleDeletePrompt = (category: singleCategoryType) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  // Обработчик для удаления категории
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await deleteCategory({
        category_id: selectedCategory._id,
      }).unwrap();
      dispatch(succesToast("Категория успешно удалена"));
      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
      dispatch(errorToast("Ошибка при удалении категории"));
    } finally {
      setDeleteModalOpen(false);
    }
  };

  // Обработчик для сохранения изменений категории
  const handleSaveCategory = async (name: string, category_id?: string) => {
    if (!category_id) return;
    console.log({
      category_id,
      data: { name },
    });

    try {
      await updateCategory({
        category_id,
        data: { name },
      }).unwrap();
      dispatch(succesToast("Категория успешно обновлена"));
    } catch (error) {
      console.error(error);
      dispatch(errorToast("Ошибка при обновлении категории"));
    }
  };
  // const initialPage = Boolean(getParam(state));

  useEffect(() => {
    const mainButton = Telegram.WebApp.MainButton;

    const toggleParam = () => {
      setParam("addNewCategory", true);
    };

    mainButton
      .setParams({
        text: "Добавить категорию",
        has_shine_effect: true,
      })
      .onClick(toggleParam);

    mainButton.show();

    return () => {
      mainButton.hide();
      mainButton.offClick(toggleParam);
    };
  }, [category]);

  return (
    <>
      {(isLoading || isLoadingDelete || isLoadingUpdate) && <Loading />}
      <div className={styles.categoryContainer}>
        <div className={styles.productsHeader}>
          <h2>Категории</h2>
          {category?.data.length == 0 && (
            <div
              className={styles.addCategory}
              onClick={() => setParam("addNewCategory", true)}>
              <span>+</span>
            </div>
          )}
        </div>

        {category?.data.length > 0 ? (
          <div className={styles.categoryList}>
            {category.data?.map((categoryItem: singleCategoryType) => (
              <SwipeableItem
                key={categoryItem._id}
                onDelete={() => handleDeletePrompt(categoryItem)}
                onEdit={() => handleEditCategory(categoryItem)}>
                <div className={styles.categoryItem}>
                  <IconTextArrow
                    text={categoryItem.name}
                    onClick={() => handleCategoryInside(categoryItem._id)}
                  />
                </div>
              </SwipeableItem>
            ))}
          </div>
        ) : (
          <div className={styles.categoryPending}>
            <Lottie animationData={search} />
          </div>
        )}

        {/* Модальные окна */}
        <AddNewCategory onClick={handleAddCategory} state="addNewCategory" />

        <AddNewCategory
          onClick={handleSaveCategory}
          state="editCategory"
          category={selectedCategory}
          isEdit={true}
        />

        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteCategory}
          itemName={selectedCategory?.name || ""}
        />
      </div>
    </>
  );
};

export default Products;
