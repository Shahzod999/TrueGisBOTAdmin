import { Link } from "react-router";
import { getValidatedUrl } from "../../utils/imgGetValidatedUrl";
import "./foodBox.scss";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price); // Разделение на тысячные
};

const FoodBox = ({ food }: any) => {
  const { _id, name, price, currency, description, image, discount } = food;

  return (
    <Link to={`/products/${_id}`} className="menu__food__box">
      <div className="menu__food__box__img">
        <img src={getValidatedUrl(image)} alt="" />
      </div>
      <div className="menu__food__box__text">
        <h4>{name}</h4>
        <p>{description}</p>
        {discount && (
          <strong className="menu__food__box__text__discount">
            {formatPrice(discount.price)} {currency}
          </strong>
        )}
        <strong
          className={`menu__food__box__text__price ${
            discount && "menu__food__box__text__oldPrice"
          }`}>
          {formatPrice(price)} {currency}
        </strong>
      </div>
    </Link>
  );
};

export default FoodBox;
