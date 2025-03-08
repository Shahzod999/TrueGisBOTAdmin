import Lottie from "lottie-react";
import search from "../../../public/utya/search.json";
import { useURLState } from "../../hooks/useURLState";
import styles from "./Products.module.scss";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router";
import {
  useGetAllProductsQuery,
  useGetOneCategoryQuery,
} from "../../features/products/productsApi";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import AddNewProdMain from "./AddNewProdMain";
import { useAppSelector } from "../../app/hooks";
import { selectedCompany } from "../../features/company/companySlice";
import FoodBox from "./FoodBox";
import { FoodBoxType } from "../../types/foodType";
import { useEffect } from "react";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const { setParam, getParam } = useURLState();
  const company = useAppSelector(selectedCompany);

  const initialPage = Boolean(getParam("addNewProductByCategory"));

  const { data, isLoading, isFetching } = useGetAllProductsQuery(
    {
      page: initialPage.toString(),
      limit: "15",
      category_id: categoryId,
      company_id: company?._id || "",
    },
    { skip: !company?._id },
  );

  const { data: category } = useGetOneCategoryQuery(categoryId);

  useEffect(() => {
    const mainButton = Telegram.WebApp.MainButton;

    const toggleParam = () => {
      setParam("addNewProductByCategory", true);
    };

    mainButton
      .setParams({
        text: "Добавить продукт",
      })
      .onClick(toggleParam);

    mainButton.show();
    return () => {
      mainButton.hide();
      mainButton.offClick(toggleParam);
    };
  }, [category, initialPage]);

  if (!company) return <Loading />;
  return (
    <>
      {(isLoading || isFetching) && <Loading />}
      <div className={`container ${styles.categoryDetails}`}>
        <div className={styles.productsHeader}>
          <h2>{category?.data?.name}</h2>
          <div
            className={styles.addCategory}
            onClick={() => setParam("addNewProductByCategory", true)}>
            <span>+</span>
          </div>
        </div>

        {data?.data.length > 0 ? (
          <div className={styles.foodBoxContainer}>
            {data?.data.map((food: FoodBoxType) => (
              <FoodBox key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <div className={styles.main}>
            <Lottie animationData={search} />
          </div>
        )}
      </div>

      <OpenFromSide
        isOpen={initialPage}
        onClose={() => setParam("addNewProductByCategory", false)}>
        <AddNewProdMain
          category={category?.data}
          companyId={company?._id || ""}
        />
      </OpenFromSide>
    </>
  );
};

export default CategoryDetails;
