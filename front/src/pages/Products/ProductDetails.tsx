import "./productDetails.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import { getValidatedUrl } from "../../utils/imgGetValidatedUrl";
import {
  useAddCompanyLinkMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useRemoveCompanyLinkMutation,
} from "../../features/products/productsApi";
import { useURLState } from "../../hooks/useURLState";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import EditProduct from "./EditProduct";
import DeleteConfirmModal from "./DeleteConfirmModal";
import FullScreenImgSwiper from "../../components/FullScreenImgSwiper/FullScreenImgSwiper";
import NotFoundPage from "../404/NotFoundPage";
import { useGetAssignedCompanyQuery } from "../../features/users/usersApi";
import { AssignedCompanyType } from "../../features/company/types";
import { ReactSVG } from "react-svg";

const ProductDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imgOpen, setImgOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { setParam, getParam } = useURLState();

  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetSingleProductQuery(id);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const { data: assignedCompanies, isLoading: isLoadingCompanies } =
    useGetAssignedCompanyQuery({});
  const [addCompanyLink, { isLoading: isAdding }] = useAddCompanyLinkMutation();
  const [removeCompanyLink, { isLoading: isRemoving }] =
    useRemoveCompanyLinkMutation();
  const singleProd = data?.data;

  // Состояние для выбранных компаний
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  // Состояние для активной вкладки (добавление или удаление)
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add");

  // Вспомогательные функции для работы с выбранными компаниями
  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId],
    );
  };

  // Функция для добавления связи с компаниями
  const handleAddCompanyLinks = async () => {
    if (!id || selectedCompanies.length === 0) {
      dispatch(errorToast("Выберите хотя бы одну компанию"));
      return;
    }
    console.log({
      product_id: id,
      company_ids: selectedCompanies,
    });

    try {
      await addCompanyLink({
        data: {
          product_id: id,
          company_ids: selectedCompanies,
        },
      }).unwrap();

      console.log({
        product_id: id,
        company_ids: selectedCompanies,
      });

      dispatch(succesToast("Компании успешно привязаны к продукту"));
      setSelectedCompanies([]);
    } catch (error) {
      console.error("Ошибка при привязке компаний:", error);
      dispatch(
        errorToast(
          (error as any).data.error_name ||
            "Произошла ошибка при привязке компаний",
        ),
      );
    }
  };

  // Функция для удаления связи с компаниями
  const handleRemoveCompanyLinks = async () => {
    if (!id || selectedCompanies.length === 0) {
      dispatch(errorToast("Выберите хотя бы одну компанию"));
      return;
    }
    console.log({
      product_id: id,
      company_ids: selectedCompanies,
    });

    try {
      await removeCompanyLink({
        data: {
          product_id: id,
          company_ids: selectedCompanies,
        },
      }).unwrap();

      dispatch(succesToast("Связи с компаниями успешно удалены"));
      setSelectedCompanies([]);
    } catch (error) {
      console.error("Ошибка при удалении связей:", error);
      dispatch(
        errorToast(
          (error as any).data.message ||
            "Произошла ошибка при удалении связей с компаниями",
        ),
      );
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const initialEditPage = Boolean(getParam("editProduct"));

  useEffect(() => {
    const mainButton = Telegram.WebApp.MainButton;
    const secondaryButton = Telegram.WebApp.SecondaryButton;

    const toggleParam = () => {
      setParam("editProduct", true);
    };
    const toggleDeleteModal = () => {
      setDeleteModalOpen(true);
    };

    mainButton
      .setParams({
        text: "Изменить",
      })
      .onClick(toggleParam);

    secondaryButton
      .setParams({
        text: "Удалить",
        color: "#fff",
        text_color: "#eb4034",
      })
      .onClick(toggleDeleteModal);

    mainButton.show();
    secondaryButton.show();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      mainButton.hide();
      secondaryButton.hide();
      mainButton.offClick(toggleParam);
      secondaryButton.offClick(toggleDeleteModal);
    };
  }, [singleProd, initialEditPage]);

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

  if (!singleProd || isError) return <NotFoundPage />;
  return (
    <div className="singleMenu">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="singleMenu__img">
            {imgOpen && (
              <FullScreenImgSwiper
                imgOpen={imgOpen}
                setImgOpen={setImgOpen}
                images={[singleProd.image]}
              />
            )}
            <img
              src={getValidatedUrl(singleProd.image)}
              alt={t("productImageAlt")}
              onClick={() => setImgOpen(true)}
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

      {/* Секция для связывания компаний */}
      <div className="singleMenu__companiesSection">
        <h2>Управление связями с компаниями</h2>

        {/* Табы для переключения режима */}
        <div className="company-tabs">
          <button
            className={`tab-button ${activeTab === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("add");
              setSelectedCompanies([]);
            }}>
            Добавить связь
          </button>

          <button
            className={`tab-button ${activeTab === "remove" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("remove");
              setSelectedCompanies([]);
            }}>
            Удалить связь
          </button>
        </div>

        {/* Список компаний */}
        <div className="companies-list">
          {assignedCompanies?.data && assignedCompanies.data.length > 0 ? (
            assignedCompanies.data.map((company: AssignedCompanyType) => (
              <div
                key={company._id}
                className={`company-item ${
                  selectedCompanies.includes(company._id) ? "selected" : ""
                }`}
                onClick={() => toggleCompanySelection(company._id)}>
                <div className="company-info">
                  <div className="company-logo">
                    {company.logo ? (
                      <img
                        src={getValidatedUrl(company.logo)}
                        alt={company.name}
                      />
                    ) : (
                      <div className="default-logo">
                        {company.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="company-details">
                    <h3>{company.name}</h3>
                    {company.address && <p>{company.address}</p>}
                  </div>
                </div>
                <div className="company-checkbox">
                  {selectedCompanies.includes(company._id) ? (
                    <div className="checkbox-selected">
                      <ReactSVG src="/static/check.svg" />
                    </div>
                  ) : (
                    <div className="checkbox-unselected"></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-companies">
              <p>Нет доступных компаний</p>
            </div>
          )}
        </div>

        {/* Кнопка действия */}
        {assignedCompanies?.data && assignedCompanies.data.length > 0 && (
          <button
            className={`action-button ${
              activeTab === "add" ? "add-button" : "remove-button"
            }`}
            onClick={
              activeTab === "add"
                ? handleAddCompanyLinks
                : handleRemoveCompanyLinks
            }
            disabled={selectedCompanies.length === 0}>
            {activeTab === "add"
              ? "Привязать выбранные компании"
              : "Удалить связь с выбранными компаниями"}
          </button>
        )}
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

      {(isFetching ||
        isDeleting ||
        isLoading ||
        isAdding ||
        isRemoving ||
        isLoadingCompanies) && <Loading />}
    </div>
  );
};

export default ProductDetails;
