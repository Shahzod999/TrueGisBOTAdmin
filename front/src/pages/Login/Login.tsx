import { ReactSVG } from "react-svg";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={`container ${styles.login}`}>
      <div className={styles.logo}>
        <ReactSVG src="./Company/logo.svg" />
        <h3>
          Trues<span>Gis</span>
        </h3>
      </div>

      <h2>Truegis бизнес!</h2>
      <p>Выполните вход в свой аккаунт</p>

      <form className={styles.form}>
        <label htmlFor="login">
          <input type="text" id="login" placeholder="Login" />
        </label>
        <label htmlFor="password">
          <input type="password" id="password" placeholder="Password" />
          <ReactSVG src="./Other/visible.svg" />
        </label>
        <label htmlFor="trueGisId">
          <input type="password" id="trueGisId" placeholder="Truegis ID" />
          <ReactSVG src="./Other/visible.svg" />
        </label>
        <button type="submit">Войти</button>
      </form>

      <div className={styles.technical}>
        <ReactSVG src="./Other/blueWarning.svg" />
        <span>Техническая поддержка</span>
      </div>
    </div>
  );
};

export default Login;
