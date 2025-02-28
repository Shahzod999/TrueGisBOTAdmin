import Lottie from "lottie-react";
import search from "../../../public/utya/search.json";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router";
import { useGetOneCategoryQuery } from "../../features/products/productsApi";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import AddNewProdMain from "./AddNewProdMain";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const { setParam, getParam } = useURLState();

  const initialPage = Boolean(getParam("addNewProductByCategory"));

  const { data: category } = useGetOneCategoryQuery(categoryId);

  return (
    <>
      {false && <Loading />}
      <div className="container adminList">
        <div className={styles.productsHeader}>
          <h2>{category?.data?.name}</h2>
          <div
            className={styles.addCategory}
            onClick={() => setParam("addNewProductByCategory", true)}>
            <div>+</div>
          </div>
        </div>

        {-1 > 0 ? (
          <div>Nice</div>
        ) : (
          <div className="adminList__main">
            <Lottie animationData={search} />
          </div>
        )}
      </div>

      <div>
        <OpenFromSide
          isOpen={initialPage}
          onClose={() => setParam("addNewProductByCategory", false)}>
          <AddNewProdMain />
        </OpenFromSide>
      </div>
    </>
  );
};

export default CategoryDetails;
