import { useState, useEffect } from "react";
import AddFoto from "../../components/AddFoto/AddFoto";
import { PhotosSample } from "../../types/companyType";
import styles from "./Products.module.scss";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import { useUpdateProductMutation } from "../../features/products/productsApi";
import useUploadImage from "../../hooks/useUploadImage";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import Loading from "../../components/Loading/Loading";
import { FoodBoxType } from "../../types/foodType";
import Switch from "../../components/Switch/Switch";
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

interface EditProductProps {
  product: FoodBoxType;
  onClose: () => void;
}

const EditProduct = ({ product, onClose }: EditProductProps) => {
  const { getParam } = useURLState();
  const dispatch = useAppDispatch();
  const [imagesArray, setimagesArray] = useState<
    (PhotosSample & { file?: File })[]
  >([]);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { handleImagesUpload, isLoading: loadingUploadImg } = useUploadImage();
  const [choosenCurrency, setChoosenCurrency] = useState<string>(
    product.currency || "",
  );
  const [discount, setDiscount] = useState<DiscountType>({
    price: product.discount?.price || "",
    start_date: product.discount?.start_date || "",
    end_date: product.discount?.end_date || "",
  });
  const [isSwipEnabled, setIsSwipEnabled] = useState<boolean>(true);

  const [productData, setProductData] = useState<ProductFormData>({
    name: product.name || "",
    weight: product.weight || "0",
    price: product.price || "0",
    description: product.description || "",
    active: product.active ? "true" : "false",
  });

  console.log(product);

  // Инициализация массива изображений при загрузке компонента
  useEffect(() => {
    if (product.image) {
      setimagesArray([
        {
          photo_id: "",
          photo_url: product.image,
          photo_url_large: "",
          video_thumbnail_url: undefined,
          latitude: 0,
          longitude: 0,
          type: "",
          photo_datetime_utc: "",
          photo_timestamp: 0,
          file: undefined,
        },
      ]);
    }
  }, [product]);

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

      // Обработка изображений
      let imageUrl = product.image;
      if (imagesArray && imagesArray.length > 0) {
        try {
          // Извлекаем файлы из imagesArray для загрузки
          const filesToUpload = imagesArray
            .filter((img) => img.file)
            .map((img) => img.file as File);

          if (filesToUpload.length > 0) {
            const uploadedImages = (await handleImagesUpload(
              filesToUpload,
            )) as string[];
            if (uploadedImages && uploadedImages.length > 0) {
              // Используем первое изображение как основное
              imageUrl = uploadedImages[0];
            }
          } else if (imagesArray[0] && imagesArray[0].photo_url) {
            // Если нет новых файлов, но есть существующее изображение
            imageUrl = imagesArray[0].photo_url;
          }
        } catch (error) {
          console.error("Upload image error:", error);
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
        image: imageUrl,
        price: productData.price,
        category_id: product.category_id,
        active: productData.active === "true",
        currency: choosenCurrency,
        company_id: product.created_by,
        discount: discountData,
        status: isSwipEnabled,
      };

      console.log(formattedData);

      await updateProduct({
        productId: product._id,
        data: formattedData,
      }).unwrap();

      dispatch(succesToast("Продукт успешно обновлен"));
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      const errorResponse = error as any;
      dispatch(
        errorToast(
          errorResponse?.data?.message ||
            "Произошла ошибка при обновлении продукта",
        ),
      );
    }
  };

  // Обработчик изменения валюты
  const handleCurrencyChange = (currency: string) => {
    setChoosenCurrency(currency);
  };
  const initialEditPage = Boolean(getParam("editProduct"));

  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) return;
    const mainButton = Telegram.WebApp.MainButton;

    try {
      const emptyFunc = () => {};
      mainButton.offClick(emptyFunc);
    } catch (e) {
      console.warn("Ошибка при очистке обработчиков:", e);
    }

    if (initialEditPage) {
      try {
        mainButton.setText("Сохранить");
        mainButton.onClick(handleSubmit);
        mainButton.show();

        // Для отладки
        console.log(
          "Установлен обработчик MainButton, текущее количество фотографий:",
          imagesArray.length,
        );
      } catch (e) {
        console.error("Ошибка при настройке MainButton:", e);
      }
    }

    return () => {
      try {
        mainButton.offClick(handleSubmit);
      } catch (e) {
        console.warn("Ошибка при отключении обработчика:", e);
      }
    };
  }, [handleSubmit, product]);

  return (
    <div className={`container ${styles.addNewProdMain}`}>
      {(isLoading || loadingUploadImg) && <Loading />}
      <DropDownMenu
        toggle={<h4 className={styles.titleAddProd}>Редактировать продукт</h4>}
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
                    <span onClick={() => handleCurrencyChange("SO'M")}>
                      SO'M
                    </span>
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

            <div className={styles.formGroup}>
              <label>Статус продукта</label>
              <Switch
                isOn={isSwipEnabled}
                handleToggle={() => setIsSwipEnabled(!isSwipEnabled)}
                id="editProduct"
              />
            </div>
          </div>
        }
      />

      <div>
        <AddFoto
          imagesArray={imagesArray}
          setimagesArray={setimagesArray}
          id="editProductPhoto"
        />
      </div>
      <div className={styles.textAreaProd}>
        <h2>
          Описание продукта <span className={styles.required}>*</span>
        </h2>

        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Опишите ваш продукт"
        />
      </div>
      {/* <IconButton
        text="Сохранить изменения"
        onClick={handleSubmit}
        styleName="linkColor"
      /> */}
    </div>
  );
};

export default EditProduct;
