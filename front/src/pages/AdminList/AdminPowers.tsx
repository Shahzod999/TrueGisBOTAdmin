import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import IconButton from "../../components/Button/IconButton";
import styles from "./adminStyle.module.scss";
import {
  useAssignAdminPowerMutation,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
} from "../../features/admins/adminApi";
import { useSelector } from "react-redux";
import { selectedCompany } from "../../features/company/companySlice";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import Loading from "../../components/Loading/Loading";
import UserCard from "../Users/UserCard";
import "./adminList.scss";
// Массив названий разрешений для отображения в интерфейсе
const PERMISSION_LABELS = [
  "Управление администраторами",
  "Аналитика",
  "Управление категориями",
  "Управление продуктами",
  "Управление комментариями",
  "Управление скидками",
];

// Ключи разрешений для отправки на сервер
const PERMISSION_KEYS = [
  "admins",
  "analytics",
  "category",
  "products",
  "comments",
  "discounts",
];

const AdminPowers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const newAdminId = searchParams.get("adminPower");
  const company = useSelector(selectedCompany);
  const { data: admin, isLoading: isLoadingAdmin } = useGetAdminByIdQuery(
    newAdminId,
    { skip: !newAdminId },
  );

  // Состояние для отслеживания, какая подсказка активна
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  // Состояние для хранения разрешений текущего администратора
  const [loggedAdminPermissions, setLoggedAdminPermissions] = useState<
    boolean[]
  >([]);

  // Состояние для хранения разрешений редактируемого администратора
  const [permissions, setPermissions] = useState(
    PERMISSION_LABELS.map(() => true),
  );

  // Загружаем разрешения авторизованного администратора из company.permissions
  useEffect(() => {
    if (company?.permissions) {
      const permissionsArray = PERMISSION_KEYS.map(
        (key) => company.permissions[key] ?? false,
      );
      setLoggedAdminPermissions(permissionsArray);
    }
  }, [company]);

  // Загружаем разрешения редактируемого администратора
  useEffect(() => {
    if (admin?.data?.permissions) {
      const permissionsArray = PERMISSION_KEYS.map(
        (key) => admin.data.permissions[key] ?? false,
      );
      setPermissions(permissionsArray);
    }
  }, [admin]);

  // Обработчик клика для показа/скрытия подсказки
  const handleTooltipToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTooltip === index) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(index);
    }
  };

  // Закрытие подсказки при клике вне компонента
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveTooltip(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [assignAdminPower, { isLoading }] = useAssignAdminPowerMutation();

  // Обновленная функция переключения разрешений с проверкой
  const togglePermission = (index: number) => {
    setPermissions((prev) => {
      const newValue = !prev[index];

      // Если пытаемся включить разрешение, которого нет у текущего админа, запрещаем
      if (newValue && !loggedAdminPermissions[index]) {
        dispatch(errorToast("У вас нет прав для назначения этого разрешения"));
        return prev;
      }

      return prev.map((value, i) => (i === index ? newValue : value));
    });
  };

  const handleSubmit = async () => {
    // Проверяем, что не пытаемся установить разрешения выше, чем у текущего админа
    const hasInvalidPermissions = permissions.some(
      (permission, index) => permission && !loggedAdminPermissions[index],
    );

    if (hasInvalidPermissions) {
      dispatch(errorToast("Нельзя назначить разрешения выше, чем у вас"));
      return;
    }

    const permissionsObject = PERMISSION_KEYS.reduce((obj, key, index) => {
      obj[key] = permissions[index];
      return obj;
    }, {} as Record<string, boolean>);

    try {
      await assignAdminPower({
        company_id: company?._id,
        admin_id: newAdminId,
        permissions: permissionsObject,
      }).unwrap();
      dispatch(succesToast("Полномочия успешно назначены"));
      navigate("/adminList");
    } catch (error) {
      dispatch(errorToast("Ошибка при назначении разрешений"));
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      await deleteAdmin(newAdminId).unwrap();
      dispatch(succesToast("Админ успешно удален"));
      navigate("/adminList");
    } catch (error) {
      console.log(error, newAdminId);
      dispatch(errorToast("Ошибка при удалении админа"));
    }
  };

  console.log(admin, "admin");

  return (
    <div className={`container ${styles.adminPowers}`}>
      {(isLoading || isDeleting || isLoadingAdmin) && <Loading />}

      <div className="adminList__list">
        <div className="adminList__list-main">
          <UserCard name={admin?.data?.full_name} />
        </div>
      </div>

      <div className={styles.titleOneAdmin}>
        <h2>Полномочия админа</h2>
      </div>

      <div className={styles.permissionsList}>
        {PERMISSION_LABELS.map((permission, index) => (
          <div className={styles.permissionItemHolder} key={index}>
            <div className={styles.permissionItem}>
              <span>{permission}</span>
              <div className={styles.switchWrapper}>
                <label
                  className={`${styles.switch} ${
                    !loggedAdminPermissions[index] ? styles.disabledSwitch : ""
                  }`}>
                  <input
                    type="checkbox"
                    checked={permissions[index]}
                    onChange={() => togglePermission(index)}
                    disabled={!loggedAdminPermissions[index]}
                  />
                  <span className={styles.slider}></span>
                </label>
                {!loggedAdminPermissions[index] && (
                  <div
                    className={`${styles.tooltipText} ${
                      activeTooltip === index ? styles.active : ""
                    }`}>
                    Недостаточно доступа
                  </div>
                )}
                {!loggedAdminPermissions[index] && (
                  <button
                    className={styles.infoButton}
                    onClick={(e) => handleTooltipToggle(index, e)}>
                    i
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <IconButton
        text="Удалить эту роль"
        styleName="deleteButton"
        onClick={handleDeleteAdmin}
      />
      <br />
      <IconButton
        text="Подтвердить"
        styleName="linkColor"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default AdminPowers;
