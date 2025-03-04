import "./productDetails.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import { getValidatedUrl } from "../../utils/imgGetValidatedUrl";
import FoodBox from "./FoodBox";
import {
  useDeleteProductMutation,
  useGetSingleProductQuery,
} from "../../features/products/productsApi";
import { FoodBoxType } from "../../types/foodType";
import { useURLState } from "../../hooks/useURLState";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import EditProduct from "./EditProduct";
import DeleteConfirmModal from "./DeleteConfirmModal";
import IconButton from "../../components/Button/IconButton";

const ProductDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setParam, getParam } = useURLState();

  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetSingleProductQuery(id);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const singleProd = data?.data;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const initialEditPage = Boolean(getParam("editProduct"));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [singleProd]);

  // Обработчик для удаления продукта
  const handleDeleteProduct = async () => {
    if (!id) return;

    try {
      await deleteProduct({
        productId: id,
      }).unwrap();
      dispatch(succesToast("Продукт успешно удален"));
      navigate(-1); // Возврат на предыдущую страницу после удаления
    } catch (error) {
      console.error(error);
      dispatch(errorToast("Ошибка при удалении продукта"));
    } finally {
      setDeleteModalOpen(false);
    }
  };

  if (!singleProd) return null;
  return (
    <div className="singleMenu">
      {isFetching || isDeleting || isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="singleMenu__img">
            <img
              src={getValidatedUrl(singleProd.image)}
              alt={t("productImageAlt")}
            />
          </div>
          <div className="singleMenu__main">
            <div className="singleMenu__main__title">
              <div className="singleMenu__main__title__pading">
                <h2>{singleProd.name}</h2>
                <p>{singleProd.description}</p>
              </div>

              <strong>
                {singleProd.price} {singleProd.currency}
              </strong>
              <div className="singleMenu__main__devider"></div>
            </div>
          </div>
        </>
      )}

      <div className="singleMenu__similarProd">
        <h2>{t("similarProducts")}</h2>
        <div className="singleMenu__similarProd__box">
          {singleProd?.similar_products?.map((food: FoodBoxType) => (
            <FoodBox food={food} key={food._id} />
          ))}
        </div>
      </div>

      {/* Кнопки для редактирования и удаления */}
      <div className="singleMenu__actions">
        <IconButton
          text="Изменить"
          onClick={() => setParam("editProduct", true)}
          styleName="linkColor"
        />
        <IconButton
          text="Удалить"
          onClick={() => setDeleteModalOpen(true)}
          styleName="deleteButton"
        />
      </div>

      {/* Модальное окно для редактирования продукта */}
      <OpenFromSide
        isOpen={initialEditPage}
        onClose={() => setParam("editProduct", false)}>
        <EditProduct
          product={singleProd}
          onClose={() => setParam("editProduct", false)}
        />
      </OpenFromSide>

      {/* Модальное окно для подтверждения удаления */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
        itemName={singleProd.name}
      />
    </div>
  );
};

export default ProductDetails;
