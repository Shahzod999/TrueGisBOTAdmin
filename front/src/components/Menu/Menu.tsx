import React, { useEffect } from "react";
import styles from "./Menu.module.scss";
import { ReactSVG } from "react-svg";
import FotoTextHint from "../FotoTextHint/FotoTextHint";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { Link, useNavigate } from "react-router";
import IconTextArrow from "../IconTextArrow/IconTextArrow";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSwitchCompanyMutation } from "../../features/auth/authApi";
import {
  selectedCompany,
  selectedCompanyToken,
  setCompany,
  setCompanyToken,
} from "../../features/company/companySlice";
import Loading from "../Loading/Loading";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectedCompanyToken);
  const company = useAppSelector(selectedCompany);
  const [switchCompany, { isLoading }] = useSwitchCompanyMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const menuItems = [
    { icon: "./iconsSvg/app.svg", text: "Админы", link: "/adminList" },
    {
      icon: "./iconsSvg/app.svg",
      text: "Аналитика и отчеты",
      link: "/analytics",
    },
    { icon: "./iconsSvg/app.svg", text: "Настройки", link: "/settings" },
    { icon: "./iconsSvg/app.svg", text: "Товары и услуги", link: "/products" },
    { icon: "./iconsSvg/app.svg", text: "Клиентская база", link: "/users" },
    { icon: "./iconsSvg/app.svg", text: "Скидки", link: "/adminList" },
  ];

  const handleSwitchCompany = async (companyId: string) => {
    try {
      let res = await switchCompany({
        company_id: companyId,
        token: token,
      }).unwrap();
      console.log(res.token);
      dispatch(setCompanyToken(res.token));
      dispatch(setCompany(res.data.company));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user, "sss");

  return (
    <>
      {isLoading && <Loading />}
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
            toggle={
              <div className={styles.companyInfo}>
                <h2 className={styles.companyName}>{company?.name}</h2>
                <span>{company?.address}</span>
              </div>
            }
            menu={
              <>
                {user?.companies.map((company, index) => (
                  <FotoTextHint
                    key={index}
                    image={company.logo || "./default.jpg"}
                    title={company.name}
                    smallText={company.address}
                    option="infoMenu"
                    onClick={() => handleSwitchCompany(company._id)}
                  />
                ))}
              </>
            }
          />
        </div>

        <div className={styles.menuList}>
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <IconTextArrow icon={item.icon} text={item.text} />
            </Link>
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
