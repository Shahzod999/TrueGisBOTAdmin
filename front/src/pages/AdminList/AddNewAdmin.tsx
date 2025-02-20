import { FormEvent, MouseEvent, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "./adminStyle.module.scss";
import IconButton from "../../components/Button/IconButton";
import { useURLState } from "../../hooks/useURLState";

const AddNewAdmin = () => {
  const { setParam } = useURLState();

  const [visible, setVisible] = useState({
    id: false,
    password: false,
  });

  const handleVisible = (key: "password" | "id") => (e: MouseEvent) => {
    e.stopPropagation();
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`container ${styles.addNewAdmin}`}>
      <div className={styles.title}>
        <h2>Новый Админ</h2>
        <span>Придумайте логин и пароль для этого роля. </span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="Login" />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type={visible.password ? "text" : "password"}
            placeholder="Password"
          />
          <ReactSVG
            src={
              visible.password ? "./Other/unVisible.svg" : "./Other/visible.svg"
            }
            onClick={handleVisible("password")}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type={visible.id ? "text" : "password"}
            placeholder="Truegis ID"
          />
          <ReactSVG
            src={visible.id ? "./Other/unVisible.svg" : "./Other/visible.svg"}
            onClick={handleVisible("id")}
          />
        </div>
      </form>

      <IconButton
        text="Далее"
        styleName="linkColor"
        onClick={() => setParam("adminPower", true)}
      />
    </div>
  );
};

export default AddNewAdmin;
