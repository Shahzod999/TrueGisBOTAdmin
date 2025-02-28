import styles from "./InfoAboutPlace.module.scss";
import TextArea from "../../../components/TextArea/TextArea";
import { useState } from "react";
import AddFoto from "../../../components/AddFoto/AddFoto";
import { PhotosSample } from "../../../types/companyType";
import SetLogo from "../../../components/AddFoto/SetLogo";
import IconButton from "../../../components/Button/IconButton";
import EditableIconTextHint from "../../../components/FotoTextHint/EditableIconTextHint";

const options = [
  {
    icon: "./iconsSvg/mappin.svg",
    arrowRight: true,
    smallText: "Название",
    title: "Costa coffee - Ц1",
  },
  {
    icon: "./iconsSvg/map.fill.svg",
    arrowRight: false,
    smallText: "Адрес",
    title: "Массив Буюк Ипак Йули, 24, Ташкент, Узбекистан",
  },
  {
    icon: "./iconsSvg/Exclude.svg",
    arrowRight: true,
    smallText: "Часы работы",
    title: "Установить",
  },
  {
    icon: "./iconsSvg/phone.svg",
    arrowRight: true,
    smallText: "Номер телефона",
    title: "+998 000 67 43",
  },
  {
    icon: "./iconsSvg/telegram.svg",
    arrowRight: true,
    smallText: "Номер Telegram",
    title: "+998 000 67 43",
  },
  {
    icon: "./iconsSvg/whatsApp.svg",
    arrowRight: true,
    smallText: "Номер WhatsApp",
    title: "+998 000 67 43",
  },
  {
    icon: "./iconsSvg/instagram.svg",
    arrowRight: true,
    smallText: "Ссылка на Instagram",
    title: "Ссылка",
  },
  {
    icon: "./iconsSvg/facebook.svg",
    arrowRight: true,
    smallText: "Ссылка на Facebook",
    title: "Ссылка",
  },
  {
    icon: "./iconsSvg/australia.svg",
    arrowRight: true,
    smallText: "Веб-сайт",
    title: "Ссылка",
  },
  {
    icon: "./iconsSvg/app.svg",
    arrowRight: true,
    smallText: "Мобильное приложение",
    title: "Ссылка",
  },
];

const InfoAboutPlace = () => {
  const [text, setText] = useState("");
  const [imagesArray, setimagesArray] = useState<PhotosSample[]>([]);

  return (
    <div className={`container ${styles.info}`}>
      <h2 className={styles.title}>Информация заведении</h2>

      <div className={styles.textArea}>
        <h3>Короткая информация</h3>
        <TextArea text={text} setText={setText} progressBar />
      </div>

      <div className={styles.infoBox}>
        {options.map((item) => (
          <div className={styles.infoBoxCard}>
            <EditableIconTextHint
              svg={item.icon}
              arrowRight={item.arrowRight}
              smallText={item.smallText}
              title={item.title}
            />
          </div>
        ))}
      </div>

      <AddFoto
        imagesArray={imagesArray}
        setimagesArray={setimagesArray}
        id="info"
      />
      <SetLogo />

      <div className={styles.button}>
        <IconButton
          styleName="linkColor"
          text="Отправить на проверку"
          onClick={() => console.log("")}
        />
      </div>
    </div>
  );
};

export default InfoAboutPlace;
