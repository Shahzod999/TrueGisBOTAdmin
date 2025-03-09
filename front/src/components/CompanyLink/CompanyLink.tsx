import { ReactSVG } from "react-svg";
import "./companyLink.scss";

const CompanyLink = () => {
  const handleOrder = () => {
    window.open("https://cosinus.uz/");
  };

  return (
    <div className="companyLink">
      <p>Powered by</p>

      <ReactSVG src="cosinus.svg" className="companyLink__icon" />
      <span onClick={handleOrder}>Cosinus LLC</span>
      <p>v0.1.0</p>
    </div>
  );
};

export default CompanyLink;
