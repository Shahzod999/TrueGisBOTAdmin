import { useState } from "react";
import AddFoto from "../../components/AddFoto/AddFoto";
import { PhotosSample } from "../../types/companyType";
import styles from "./Products.module.scss";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import IconButton from "../../components/Button/IconButton";

interface ProductFormData {
  name: string;
  weight: string;
  price: string;
  description: string;
}

const AddNewProdMain = () => {
  const [imagesArray, setimagesArray] = useState<PhotosSample[]>([]);
  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    weight: "0",
    price: "0",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(productData);
  };
  return (
    <div className={`container ${styles.addNewProdMain}`}>
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
              />
            </div>
          </div>
        }
      />

      <div>
        <AddFoto
          imagesArray={imagesArray}
          setimagesArray={setimagesArray}
          id="product"
        />
      </div>

      <div className={styles.textAreaProd}>
        <h2>
          Описание продукта <span className={styles.required}>*</span>
        </h2>

        <textarea placeholder="Опишите ваш продукт" />
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
