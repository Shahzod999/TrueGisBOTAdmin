import { useState } from "react";
import AddFoto from "../../components/AddFoto/AddFoto";
import { PhotosSample } from "../../types/companyType";
import styles from "./Products.module.scss";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import IconButton from "../../components/Button/IconButton";
import { useAddNewProductsMutation } from "../../features/products/productsApi";
import { singleCategoryType } from "../../types/categoryTypes";
import useUploadImage from "../../hooks/useUploadImage";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import Loading from "../../components/Loading/Loading";
import { useURLState } from "../../hooks/useURLState";

interface ProductFormData {
  name: string;
  weight: string;
  price: string;
  description: string;
  active?: string;
}

interface DiscountType {
  price: string;
  start_date: string;
  end_date: string;
}

const AddNewProdMain = ({
  category,
  companyId,
}: {
  category: singleCategoryType;
  companyId: string;
}) => {
  const { setParam } = useURLState();
  const dispatch = useAppDispatch();
  const [imagesArray, setimagesArray] = useState<
    (PhotosSample & { file?: File })[]
  >([]);
  const [addNewProduct, { isLoading }] = useAddNewProductsMutation();
  const { handleImagesUpload, isLoading: loadingUploadImg } = useUploadImage();
  const [choosenCurrency, setChoosenCurrency] = useState<string>("");
  const [discount, setDiscount] = useState<DiscountType>({
    price: "",
    start_date: "",
    end_date: "",
  });

  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    weight: "0",
    price: "0",
    description: "",
    active: "true",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (imagesArray.length === 0) {
        throw {
          data: { message: "Вы забыли загрузить фотографию" },
        };
      }
      if (choosenCurrency === "" || choosenCurrency === undefined) {
        throw {
          data: { message: "Выберите валюту" },
        };
      }

      if (!productData.name.trim()) {
        throw {
          data: { message: "Введите название продукта" },
        };
      }

      if (!productData.price || parseFloat(productData.price) <= 0) {
        throw {
          data: { message: "Укажите корректную цену продукта" },
        };
      }

      if (!productData.description.trim()) {
        throw {
          data: { message: "Добавьте описание продукта" },
        };
      }

      let newPhotoProduct: any = [];
      if (imagesArray.length > 0) {
        try {
          // Извлекаем файлы из imagesArray для загрузки
          const filesToUpload = imagesArray
            .filter((img) => img.file)
            .map((img) => img.file as File);

          if (filesToUpload.length > 0) {
            newPhotoProduct = await handleImagesUpload(filesToUpload);
            console.log("Uploaded Logo:", newPhotoProduct);
          }
        } catch (error) {
          console.error("Upload logo error:", error);
        }
      }

      // Проверка валидности дат скидки
      let discountData = undefined;
      if (discount.price) {
        if (!discount.price || parseFloat(discount.price) <= 0) {
          throw {
            data: { message: "Укажите корректную цену со скидкой" },
          };
        }

        if (parseFloat(discount.price) >= parseFloat(productData.price)) {
          throw {
            data: {
              message: "Цена со скидкой должна быть меньше обычной цены",
            },
          };
        }

        if (!discount.start_date || !discount.end_date) {
          throw {
            data: { message: "Укажите даты начала и окончания скидки" },
          };
        }

        const startDate = new Date(discount.start_date);
        const endDate = new Date(discount.end_date);

        if (startDate > endDate) {
          throw {
            data: {
              message: "Дата начала скидки не может быть позже даты окончания",
            },
          };
        }

        discountData = {
          price: discount.price,
          start_date: discount.start_date,
          end_date: discount.end_date,
        };
      }

      const formattedData = {
        ...productData,
        image: newPhotoProduct?.[0]?.image || "",
        price: productData.price,
        category_id: category?._id,
        active: productData.active === "true",
        currency: choosenCurrency,
        company_id: companyId,
        discount: discountData,
      };

      console.log(formattedData);

      await addNewProduct({
        data: formattedData,
      }).unwrap();

      setimagesArray([]);

      dispatch(succesToast("Продукт успешно добавлен"));

      // Сбросить форму после успешной отправки
      setProductData({
        name: "",
        weight: "0",
        price: "0",
        description: "",
        active: "true",
      });
      setDiscount({
        price: "",
        start_date: "",
        end_date: "",
      });
      setChoosenCurrency("");
      setParam("addNewProductByCategory", false);
    } catch (error) {
      console.error("Error submitting product:", error);
      const errorResponse = error as any;
      dispatch(
        errorToast(
          errorResponse?.data?.message ||
            "Произошла ошибка при добавлении продукта",
        ),
      );
    }
  };

  // Обработчик изменения валюты
  const handleCurrencyChange = (currency: string) => {
    setChoosenCurrency(currency);
  };

  return (
    <div className={`container ${styles.addNewProdMain}`}>
      {isLoading || (loadingUploadImg && <Loading />)}
      <h2 className={styles.mainTitle}>{category?.name}</h2>
      <DropDownMenu
        toggle={<h4 className={styles.titleAddProd}>Новый продукт</h4>}
        menu={
          <div className={styles.productForm}>
            <div className={styles.formGroup}>
              <label>
                Название продукта <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Введите название"
                inputMode="text"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Вес продукта в граммах</label>
              <input
                type="number"
                name="weight"
                value={productData.weight}
                onChange={handleInputChange}
                placeholder="0 грамм"
                min={0}
                inputMode="numeric"
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Цена продукта <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="0 сум"
                inputMode="numeric"
                min={0}
              />
            </div>
            <div className={styles.formGroup}>
              <DropDownMenu
                toggle={
                  <h5>
                    Выберите валюту <span className={styles.required}>*</span>
                    {choosenCurrency}
                  </h5>
                }
                menu={
                  <div className={styles.currencyHolder}>
                    <span onClick={() => handleCurrencyChange("SO'M")}>SO'M</span>
                    <span onClick={() => handleCurrencyChange("USD")}>USD</span>
                    <span onClick={() => handleCurrencyChange("RUB")}>RUB</span>
                  </div>
                }
              />
            </div>

            <div className={styles.formGroup}>
              <DropDownMenu
                toggle={<h5>Скидка на продукт</h5>}
                menu={
                  <div className={styles.discountForm}>
                    <div className={styles.formGroup}>
                      <label>Цена со скидкой</label>
                      <input
                        type="number"
                        name="price"
                        value={discount.price}
                        onChange={handleDiscountChange}
                        placeholder="Цена со скидкой"
                        min={0}
                        inputMode="numeric"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Дата начала скидки</label>
                      <input
                        type="date"
                        name="start_date"
                        value={discount.start_date}
                        onChange={handleDiscountChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Дата окончания скидки</label>
                      <input
                        type="date"
                        name="end_date"
                        value={discount.end_date}
                        onChange={handleDiscountChange}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        }
      />

      <div>
        <AddFoto
          imagesArray={imagesArray}
          setimagesArray={setimagesArray}
          id="addNewProd"
        />
      </div>
      <div className={styles.textAreaProd}>
        <h2>
          Описание набора <span className={styles.required}>*</span>
        </h2>

        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Опишите ваш продукт"
        />
      </div>
      <IconButton
        text="Добавить"
        onClick={handleSubmit}
        styleName="linkColor"
      />
    </div>
  );
};

export default AddNewProdMain;
