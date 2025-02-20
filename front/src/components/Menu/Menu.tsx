import React, { useEffect } from "react";
import styles from "./Menu.module.scss";
import { ReactSVG } from "react-svg";
import FotoTextHint from "../FotoTextHint/FotoTextHint";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { useNavigate } from "react-router";
import IconTextArrow from "../IconTextArrow/IconTextArrow";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const coffeeShops = [
    { image: "/placeholder.png", title: "Costa coffee - Ц1", address: "Адрес" },
    {
      image: "/placeholder.png",
      title: "Costa coffee - Вестминистр центр",
      address: "Адрес",
    },
    {
      image: "/placeholder.png",
      title: "Costa coffee - Шевченко улица",
      address: "Адрес",
    },
  ];

  const menuItems = [
    { icon: "./iconsSvg/app.svg", text: "Админы" },
    { icon: "./iconsSvg/app.svg", text: "Аналитика и отчеты" },
    { icon: "./iconsSvg/app.svg", text: "Настройки" },
    { icon: "./iconsSvg/app.svg", text: "Товары и услуги" },
    { icon: "./iconsSvg/app.svg", text: "Клиентская база" },
    { icon: "./iconsSvg/app.svg", text: "Скидки" },
  ];

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlayVisible : ""
        } dropMenu`}
        onClick={onClose}></div>

      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <img src="logo.png" />

          <ReactSVG src="./iconsSvg/bells.svg" className={styles.bells} />
        </div>

        <div className={styles.dropMenu}>
          <DropDownMenu
            toggle={<h2 className={styles.companyName}>Costa Coffee - Ц1</h2>}
            menu={
              <>
                {coffeeShops.map((shop, index) => (
                  <FotoTextHint key={index} {...shop} />
                ))}
              </>
            }
          />
        </div>

        <div className={styles.menuList}>
          {menuItems.map((item, index) => (
            <IconTextArrow key={index} icon={item.icon} text={item.text} />
          ))}
        </div>

        <div className={styles.logOut} onClick={() => navigate("/login")}>
          <ReactSVG src="./iconsSvg/logOut.svg" className={styles.logOutIcon} />
          <span>Выйти</span>
        </div>
      </div>
    </>
  );
};

export default Menu;
