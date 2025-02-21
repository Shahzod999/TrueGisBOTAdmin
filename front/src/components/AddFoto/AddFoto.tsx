import { useEffect, useState } from "react";
import Cross from "./Cross";
import { ReactSVG } from "react-svg";
import FullScreenImgSwiper from "../FullScreenImgSwiper/FullScreenImgSwiper";
import { getValidatedUrl } from "../../utils/imgGetValidatedUrl";
import { PhotosSample } from "../../types/companyType";
import "./addFoto.scss";

interface AddFotoProps {
  imagesArray: (PhotosSample & { file?: File })[];
  setimagesArray: React.Dispatch<
    React.SetStateAction<(PhotosSample & { file?: File })[]>
  >;
  id: string;
  maxLength?: boolean;
}

const AddFoto = ({
  imagesArray,
  setimagesArray,
  id,
  maxLength,
}: AddFotoProps) => {
  const [imgOpen, setImgOpen] = useState(false);
  const [indexImg, setIndexImg] = useState(0);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (maxLength) {
      const filesArray = Array.from(files);
      if (filesArray.length > 4 || imagesArray.length >= 4) {
        if (window.Telegram.WebApp.showAlert) {
          window.Telegram.WebApp.showAlert("addPhotoLimit");
        } else {
          alert("addPhotoLimit");
        }
        e.target.value = "";
        return;
      }
    }

    if (files) {
      const newImages = Array.from(files).map((file) => ({
        photo_id: "",
        photo_url: URL.createObjectURL(file),
        photo_url_large: "",
        video_thumbnail_url: null,
        latitude: 0,
        longitude: 0,
        type: "photo",
        photo_datetime_utc: new Date().toISOString(),
        photo_timestamp: Date.now(),
        file,
      }));
      setimagesArray((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setimagesArray((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleImgOpen = (i: number) => {
    setIndexImg(i);
    setImgOpen(!imgOpen);
  };

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (imgOpen) {
      tg.BackButton.show();

      const handleBackClick = () => {
        setImgOpen(false);
      };

      tg.BackButton.onClick(handleBackClick);

      return () => {
        tg.BackButton.offClick(handleBackClick);
      };
    }
  }, [imgOpen]);

  return (
    <div className="addFoto">
      <h2>Добавить фотографию</h2>

      <input
        accept="image/*"
        type="file"
        id={id}
        multiple
        onChange={handleImagePreview}
      />

      <div className="addFoto__imagesArray">
        {imgOpen ? (
          <>
            <FullScreenImgSwiper
              imgOpen={imgOpen}
              setImgOpen={setImgOpen}
              images={imagesArray.map((item) => item.photo_url)}
              indexImg={indexImg}
            />
          </>
        ) : (
          <>
            {imagesArray.map((image, index) => (
              <div className="addFoto__imagesArray__img" key={index}>
                <div className="addFoto__imagesArray__img__cross">
                  <Cross toggleComment={() => removeImage(index)} />
                </div>
                <img
                  src={getValidatedUrl(image.photo_url)}
                  alt={`preview-${index}`}
                  onClick={() => toggleImgOpen(index)}
                />
              </div>
            ))}
          </>
        )}

        <label htmlFor={id}>
          <ReactSVG src="./iconsSvg/camera.fill.svg" />
          <span>Добавить фотографию</span>
        </label>
      </div>
    </div>
  );
};

export default AddFoto;
