import Lottie from "lottie-react";
import notFound from "../../../public/utya/notFound.json";
import "./adminList.scss";
import AddNewAdmin from "./AddNewAdmin";

import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import AdminPowers from "./AdminPowers";
import { useURLState } from "../../hooks/useURLState";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../features/admins/adminApi";
import UserCard from "../Users/UserCard";
import { errorToast } from "../../features/Toast/toastSlice";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";
import SwipeableItem from "../../components/SwipeableItem/SwipeableItem";
import { succesToast } from "../../features/Toast/toastSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";

const AdminList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getParam, setParam } = useURLState();
  const initialPage = Boolean(getParam("addNewAdmin"));
  const adminPowerState = Boolean(getParam("adminPower"));
  const { data: admins, isLoading } = useGetAdminsQuery({});
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  useEffect(() => {
    const mainButton = Telegram.WebApp.MainButton;

    const toggleParam = () => {
      setParam("addNewAdmin", true);
    };

    if (!initialPage && !adminPowerState) {
      mainButton
        .setParams({
          text: "Добавить админа",
          has_shine_effect: true,
        })
        .onClick(toggleParam);

      mainButton.show();
    }

    return () => {
      mainButton.hide();
      mainButton.offClick(toggleParam);
    };
  }, [admins, adminPowerState, initialPage, adminPowerState]);

  const handleDeleteAdmin = async (newAdminId: string) => {
    try {
      await deleteAdmin(newAdminId).unwrap();
      dispatch(succesToast("Админ успешно удален"));
      navigate("/adminList");
    } catch (error) {
      console.log(error, newAdminId);
      dispatch(errorToast("Ошибка при удалении админа"));
    }
  };

  return (
    <>
      {(isLoading || isDeleting) && <Loading />}
      <div className="container adminList">
        <h2>Админы</h2>

        {admins?.data.length > 0 ? (
          <div className="adminList__list">
            <div className="adminList__list-main">
              {admins.data?.map((admin: any) => (
                <SwipeableItem
                  key={admin._id}
                  onDelete={() => handleDeleteAdmin(admin._id)}
                  onEdit={() => setParam("adminPower", admin._id)}>
                  <div className="adminList__list-main-item">
                    <UserCard
                      key={admin._id}
                      name={admin.full_name}
                      onClick={() => setParam("adminPower", admin._id)}
                    />
                  </div>
                </SwipeableItem>
              ))}
            </div>
          </div>
        ) : (
          <div className="adminList__main">
            <Lottie animationData={notFound} />
          </div>
        )}

        {/* <IconButton
          text="Добавить админа"
          styleName="linkColor"
          onClick={() => setParam("addNewAdmin", true)}
        /> */}
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
