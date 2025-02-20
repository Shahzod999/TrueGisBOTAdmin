import Lottie from "lottie-react";
import notFound from "../../../public/utya/notFound.json";
import "./adminList.scss";
import IconButton from "../../components/Button/IconButton";
import AddNewAdmin from "./AddNewAdmin";

import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import AdminPowers from "./AdminPowers";
import { useURLState } from "../../hooks/useURLState";

const AdminList = () => {
  const { getParam, setParam } = useURLState();
  const initialPage = Boolean(getParam("addNewAdmin"));
  const adminPowerState = Boolean(getParam("adminPower"));

  return (
    <>
      <div className="container adminList">
        <h2>Админы</h2>

        <div className="adminList__main">
          <Lottie animationData={notFound} />
        </div>

        <IconButton
          text="Добавить роль"
          styleName="linkColor"
          onClick={() => setParam("addNewAdmin", true)}
        />
      </div>
      <OpenFromSide
        isOpen={initialPage}
        onClose={() => setParam("addNewAdmin", false)}>
        <AddNewAdmin />
      </OpenFromSide>

      <OpenFromSide
        isOpen={adminPowerState}
        onClose={() => setParam("adminPower", false)}>
        <AdminPowers />
      </OpenFromSide>
    </>
  );
};

export default AdminList;
