import { useState } from "react";
import { ReactSVG } from "react-svg";
import "./setLogo.scss";

const SetLogo = () => {
  const [logoImg, setLogoImg] = useState<string | File>();

  console.log(logoImg);

  return (
    <div>
      <h3 className="second__title">Логотип заведения</h3>

      <div className="fotoLogoEdit">
        <div className="fotoLogoEdit__img">
          <img src="./httpslogo.png" alt="" />
        </div>

        <label htmlFor="addFoto__logo__img">
          <ReactSVG src="./iconsSvg/camera.fill.svg" />
          <span>addPhoto</span>
        </label>

        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          id="addFoto__logo__img"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setLogoImg(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SetLogo;
