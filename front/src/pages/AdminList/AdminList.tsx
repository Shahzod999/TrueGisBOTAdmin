import Lottie from "lottie-react";
import notFound from "../../../public/utya/notFound.json";
import "./adminList.scss";
import IconButton from "../../components/Button/IconButton";
import AddNewAdmin from "./AddNewAdmin";

import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import AdminPowers from "./AdminPowers";
import { useURLState } from "../../hooks/useURLState";
import { useGetAdminsQuery } from "../../features/admins/adminApi";
import UserCard from "../Users/UserCard";
const AdminList = () => {
  const { getParam, setParam } = useURLState();
  const initialPage = Boolean(getParam("addNewAdmin"));
  const adminPowerState = Boolean(getParam("adminPower"));
  const { data: admins } = useGetAdminsQuery({});

  return (
    <>
      <div className="container adminList">
        <h2>Админы</h2>

        {admins?.data.length > 0 ? (
          <div className="adminList__list">
            <div className="adminList__list-main">
              {admins.data?.map((admin: any) => (
                <UserCard
                  key={admin._id}
                  name={admin.full_name}
                  onClick={() => setParam("adminPower", admin._id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="adminList__main">
            <Lottie animationData={notFound} />
          </div>
        )}

        <IconButton
          text="Добавить админа"
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
