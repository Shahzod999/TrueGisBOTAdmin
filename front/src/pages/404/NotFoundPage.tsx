import Lottie from "lottie-react";
import noUtya from "../../../public/utya/notFound.json";

import "./notFound.scss";

const NotFoundPage = () => {
  return (
    <div className="container notFound">
      <div className="holder">
        <Lottie animationData={noUtya} />

        <h1>404</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
