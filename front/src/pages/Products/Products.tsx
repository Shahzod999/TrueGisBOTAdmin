import Lottie from "lottie-react";
import search from "../../../public/utya/search.json";
import IconButton from "../../components/Button/IconButton";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
import {
  useAddNewCategoryMutation,
  useGetCategoryQuery,
} from "../../features/products/productsApi";
import Loading from "../../components/Loading/Loading";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import { useAppDispatch } from "../../app/hooks";
import IconTextArrow from "../../components/IconTextArrow/IconTextArrow";
import { useNavigate } from "react-router";
import AddNewCategory from "./AddNewCategory";
const Products = () => {
  const navigate = useNavigate();
  const { setParam } = useURLState();
  const { data: category } = useGetCategoryQuery({});
  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();
  const dispatch = useAppDispatch();

  const handleAddCategory = async (itemName: string) => {
    try {
      let res = await addNewCategory({
        name: itemName,
      }).unwrap();
      console.log(res);
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

  console.log(category);

  return (
    <>
      {isLoading && <Loading />}
      <div className="container adminList">
        <div className={styles.productsHeader}>
          <h2>Категории</h2>
          {category?.data.length == 0 && (
            <div
              className={styles.addCategory}
              onClick={() => setParam("addNewCategory", true)}>
              <div>+</div>
            </div>
          )}
        </div>

        {category?.data.length > 0 ? (
          <div className={styles.categoryList}>
            {category.data?.map((admin: any) => (
              <IconTextArrow
                text={admin.name}
                onClick={() => handleCategoryInside(admin._id)}
              />
            ))}
          </div>
        ) : (
          <div className="adminList__main">
            <Lottie animationData={search} />
          </div>
        )}

        {category?.data.length > 0 && (
          <IconButton
            text="Добавить свою категорию"
            styleName="linkColor"
            onClick={() => setParam("addNewCategory", true)}
          />
        )}
      </div>

      <AddNewCategory onClick={handleAddCategory} state="addNewCategory" />
    </>
  );
};

export default Products;
