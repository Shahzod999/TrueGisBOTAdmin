import { useState } from "react";
import { useNavigate } from "react-router";
import IconButton from "../../components/Button/IconButton";
import styles from "./adminStyle.module.scss";

const PERMISSIONS = [
  "Добавление категории",
  "Внести скидки",
  "Добавление продукта",
  "Добавление категории",
  "Внести скидки",
  "Внести скидки",
  "Добавление продукта",
];

const AdminPowers = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(PERMISSIONS.map(() => false));

  const togglePermission = (index: number) => {
    setPermissions((prev) =>
      prev.map((value, i) => (i === index ? !value : value)),
    );
  };

  return (
    <div className={`container ${styles.adminPowers}`}>
      <div className={styles.title}>
        <h2>Полномочия админа</h2>
        <span>Включите действия, которые разрешаете этому админу.</span>
      </div>

      <div className={styles.permissionsList}>
        {PERMISSIONS.map((permission, index) => (
          <div className={styles.permissionItemHolder}>
            <div key={index} className={styles.permissionItem}>
              <span>{permission}</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions[index]}
                  onChange={() => togglePermission(index)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <IconButton
        text="Отправить запрос"
        styleName="linkColor"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default AdminPowers;
