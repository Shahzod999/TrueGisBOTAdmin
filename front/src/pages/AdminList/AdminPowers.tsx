import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import styles from "./adminStyle.module.scss";
import {
  useAssignAdminPowerMutation,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useChangeAdminMutation,
  useUnAssignAdminPowerMutation,
} from "../../features/admins/adminApi";
import { useSelector } from "react-redux";
import { selectedCompany } from "../../features/company/companySlice";
import { useAppDispatch } from "../../app/hooks";
import {
  errorToast,
  infoToast,
  succesToast,
} from "../../features/Toast/toastSlice";
import Loading from "../../components/Loading/Loading";
import UserCard from "../Users/UserCard";
import "./adminList.scss";
import { ReactSVG } from "react-svg";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import {
  useGetAssignedCompanyQuery,
  useGetCurrentAdminAssignedCompanysQuery,
} from "../../features/users/usersApi";
import FotoTextHint from "../../components/FotoTextHint/FotoTextHint";
import { AssignedCompanyType } from "../../features/company/types";
import PermissionsList, {
  PERMISSION_NAMES,
} from "../../components/PermissionsList";
import { getValidatedUrl } from "../../utils/imgGetValidatedUrl";
import { useURLState } from "../../hooks/useURLState";
import IconButton from "../../components/Button/IconButton";
interface AdminFormData {
  full_name: string;
  password: string;
  username: string;
}

const AdminPowers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const newAdminId = searchParams.get("adminPower");

  const company = useSelector(selectedCompany);
  const [changeAdmin, { isLoading: isChangingAdmin }] =
    useChangeAdminMutation();
  const {
    data: admin,
    isLoading: isLoadingAdmin,
    isFetching,
  } = useGetAdminByIdQuery(newAdminId, { skip: !newAdminId });
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const { data: assignedCompanies } = useGetAssignedCompanyQuery({});
  const { data: currentAdminAssignedCompanys } =
    useGetCurrentAdminAssignedCompanysQuery(newAdminId || "", {
      skip: !newAdminId,
    });
  const [unAssignAdminPower, { isLoading: isUnAssigning }] =
    useUnAssignAdminPowerMutation();

  const totalCompanies = assignedCompanies?.data?.filter(
    (company: AssignedCompanyType) =>
      !currentAdminAssignedCompanys?.data?.some(
        (assignedCompany: AssignedCompanyType) =>
          assignedCompany._id === company._id,
      ),
  );

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [adminFormData, setAdminFormData] = useState<AdminFormData>({
    full_name: "",
    password: "",
    username: "",
  });

  const [permissions, setPermissions] = useState<boolean[]>([]);

  const [companyPermissions, setCompanyPermissions] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [originalCompanyPermissions, setOriginalCompanyPermissions] = useState<
    Record<string, Record<string, boolean>>
  >({});

  useEffect(() => {
    if (admin?.data?.permissions) {
      const permissionsArray = Object.keys(admin.data.permissions).map(
        (key) => admin.data.permissions[key] ?? false,
      );
      setPermissions(permissionsArray);
    }

    if (admin?.data) {
      setAdminFormData({
        full_name: admin.data.full_name || "",
        username: admin.data.username || "",
        password: "",
      });
    }
  }, [admin]);

  useEffect(() => {
    if (assignedCompanies?.data && currentAdminAssignedCompanys?.data) {
      const permissionsMap: Record<string, Record<string, boolean>> = {};
      const originalMap: Record<string, Record<string, boolean>> = {};

      // Сначала обрабатываем текущие назначенные компании администратора
      currentAdminAssignedCompanys.data.forEach(
        (company: AssignedCompanyType) => {
          if (company.permissions && typeof company.permissions === "object") {
            const permissions: Record<string, boolean> = {};

            // Находим соответствующую компанию в assignedCompanies для проверки ограничений
            const assignedCompany = assignedCompanies.data.find(
              (ac: AssignedCompanyType) => ac._id === company._id,
            );

            Object.keys(company.permissions).forEach((key) => {
              if (
                company.permissions &&
                typeof company.permissions === "object"
              ) {
                // Проверяем, что разрешение не превышает ограничение из assignedCompanies
                const assignedPermissionValue = assignedCompany?.permissions
                  ? Boolean(
                      (
                        assignedCompany.permissions as unknown as Record<
                          string,
                          any
                        >
                      )[key],
                    )
                  : false;

                const currentPermissionValue = Boolean(
                  (company.permissions as Record<string, any>)[key],
                );

                // Разрешение не может быть true, если в assignedCompanies оно false
                permissions[key] = assignedPermissionValue
                  ? currentPermissionValue
                  : false;
              } else {
                permissions[key] = false;
              }
            });

            permissionsMap[company._id] = permissions;
            originalMap[company._id] = { ...permissions };
          } else {
            const defaultPermissions = Object.keys(PERMISSION_NAMES).reduce(
              (obj, key) => {
                obj[key] = false;
                return obj;
              },
              {} as Record<string, boolean>,
            );

            permissionsMap[company._id] = defaultPermissions;
            originalMap[company._id] = { ...defaultPermissions };
          }
        },
      );

      // Добавляем компании из assignedCompanies, которых нет в currentAdminAssignedCompanys
      assignedCompanies.data.forEach((company: AssignedCompanyType) => {
        if (
          !permissionsMap[company._id] &&
          company.permissions &&
          typeof company.permissions === "object"
        ) {
          const permissions: Record<string, boolean> = {};

          Object.keys(company.permissions).forEach((key) => {
            // По умолчанию все разрешения выключены
            permissions[key] = false;
          });

          permissionsMap[company._id] = permissions;
          originalMap[company._id] = { ...permissions };
        }
      });

      setCompanyPermissions(permissionsMap);
      setOriginalCompanyPermissions(originalMap);
    }
  }, [assignedCompanies, currentAdminAssignedCompanys]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTooltipToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTooltip === index) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(index);
    }
  };

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

  const handleToggleCompanyPermission = (
    companyId: string,
    permissionKey: string,
  ) => {
    if (!Object.keys(PERMISSION_NAMES).includes(permissionKey)) {
      console.log(`Неизвестный ключ разрешения: ${permissionKey}`);
      return;
    }

    // Находим компанию в assignedCompanies для проверки ограничений
    const assignedCompany = assignedCompanies?.data?.find(
      (company: AssignedCompanyType) => company._id === companyId,
    );

    // Проверяем, разрешено ли включение этого разрешения
    const assignedPermissionValue = assignedCompany?.permissions
      ? Boolean(
          (assignedCompany.permissions as unknown as Record<string, any>)[
            permissionKey
          ],
        )
      : false;

    // Если текущее значение false и мы пытаемся его включить, проверяем ограничения
    const currentValue =
      companyPermissions[companyId]?.[permissionKey] || false;

    if (!currentValue && !assignedPermissionValue) {
      dispatch(
        errorToast("Это разрешение не может быть включено из-за ограничений"),
      );
      return;
    }

    setCompanyPermissions((prev) => {
      if (!prev[companyId]) {
        const defaultPermissions = Object.keys(PERMISSION_NAMES).reduce(
          (obj, key) => {
            // Устанавливаем разрешения в соответствии с ограничениями
            const canEnable = assignedCompany?.permissions
              ? Boolean(
                  (
                    assignedCompany.permissions as unknown as Record<
                      string,
                      any
                    >
                  )[key],
                )
              : false;

            obj[key] = key === permissionKey && canEnable ? true : false;
            return obj;
          },
          {} as Record<string, boolean>,
        );

        return {
          ...prev,
          [companyId]: defaultPermissions,
        };
      }

      const companyPerms = { ...prev[companyId] };

      // Если текущее значение false и мы пытаемся его включить, проверяем ограничения
      if (!companyPerms[permissionKey]) {
        // Можем включить только если это разрешено в assignedCompanies
        companyPerms[permissionKey] = assignedPermissionValue;
      } else {
        // Выключить разрешение можно всегда
        companyPerms[permissionKey] = false;
      }

      return {
        ...prev,
        [companyId]: companyPerms,
      };
    });
  };

  const hasCompanyPermissionsChanged = (companyId: string) => {
    if (
      !originalCompanyPermissions[companyId] ||
      !companyPermissions[companyId]
    ) {
      return false;
    }

    const original = originalCompanyPermissions[companyId];
    const current = companyPermissions[companyId];

    // Находим компанию в assignedCompanies для проверки ограничений
    const assignedCompany = assignedCompanies?.data?.find(
      (company: AssignedCompanyType) => company._id === companyId,
    );

    const hasChanges = Object.keys(original).some((key) => {
      const originalValue = Boolean(original[key]);
      const currentValue = Boolean(current[key]);

      // Проверяем, разрешено ли это разрешение в assignedCompanies
      const assignedPermissionValue = assignedCompany?.permissions
        ? Boolean(
            (assignedCompany.permissions as unknown as Record<string, any>)[
              key
            ],
          )
        : false;

      // Если разрешение ограничено в assignedCompanies, то оно должно быть false
      const validCurrentValue = assignedPermissionValue ? currentValue : false;

      const changed = originalValue !== validCurrentValue;

      return changed;
    });

    return hasChanges;
  };

  const handleSaveCompanyPermissions = async (companyId: string) => {
    if (!hasCompanyPermissionsChanged(companyId)) {
      dispatch(infoToast("Полномочия не изменены"));
      return;
    }

    try {
      // Находим компанию в assignedCompanies для проверки ограничений
      const assignedCompany = assignedCompanies?.data?.find(
        (company: AssignedCompanyType) => company._id === companyId,
      );

      // Применяем ограничения перед сохранением
      const permissionsToSave = { ...companyPermissions[companyId] };

      // Проверяем каждое разрешение на соответствие ограничениям
      Object.keys(permissionsToSave).forEach((key) => {
        const assignedPermissionValue = assignedCompany?.permissions
          ? Boolean(
              (assignedCompany.permissions as unknown as Record<string, any>)[
                key
              ],
            )
          : false;

        // Если разрешение ограничено в assignedCompanies, то оно должно быть false
        if (!assignedPermissionValue) {
          permissionsToSave[key] = false;
        }
      });

      // Проверяем, что все необходимые данные присутствуют
      if (!companyId || !newAdminId) {
        console.error("Отсутствуют необходимые данные для сохранения:", {
          companyId,
          newAdminId,
        });
        dispatch(errorToast("Ошибка: отсутствуют необходимые данные"));
        return;
      }

      // Используем try-catch внутри основного try блока для обработки ошибок unwrap()
      try {
        await assignAdminPower({
          company_id: companyId,
          admin_id: newAdminId,
          permissions: permissionsToSave,
        }).unwrap();

        dispatch(succesToast("Разрешения успешно обновлены"));
      } catch (unwrapError: any) {
        console.error("Ошибка при unwrap:", unwrapError);

        // Проверяем, есть ли сообщение об ошибке в ответе API
        if (unwrapError.data && unwrapError.data.message) {
          dispatch(errorToast(unwrapError.data.message));
        } else if (unwrapError.message) {
          dispatch(errorToast(unwrapError.message));
        } else {
          dispatch(errorToast("Ошибка при сохранении разрешений"));
        }

        // Не пробрасываем ошибку дальше, чтобы не вызвать внешний catch блок
        return;
      }
    } catch (error: any) {
      console.error("Общая ошибка при сохранении разрешений:", error);

      // Проверяем, есть ли сообщение об ошибке
      if (error.message) {
        dispatch(errorToast(error.message));
      } else {
        dispatch(errorToast("Неизвестная ошибка при сохранении разрешений"));
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const permissionsObject = Object.keys(company?.permissions || {}).reduce(
      (obj, key, index) => {
        obj[key] = permissions[index];
        return obj;
      },
      {} as Record<string, boolean>,
    );
    try {
      await assignAdminPower({
        company_id: company?._id,
        admin_id: newAdminId,
        permissions: permissionsObject,
      }).unwrap();
      // Проверяем, были ли внесены изменения в данные администратора
      const isDataChanged =
        admin?.data?.full_name !== adminFormData.full_name ||
        admin?.data?.username !== adminFormData.username ||
        adminFormData.password.length > 0;

      // Отправляем запрос на изменение данных только если были внесены изменения
      if (isDataChanged) {
        if (Object.keys(adminFormData).length > 0) {
          await changeAdmin({
            id: newAdminId,
            data: adminFormData,
          }).unwrap();
        }
      }

      dispatch(succesToast("Данные администратора успешно обновлены"));
      navigate("/adminList");
    } catch (error) {
      dispatch(
        errorToast(
          (error as any).data.message ||
            "Ошибка при обновлении данных администратора",
        ),
      );
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

  const handleUnAssignAdminPower = async (companyId: string) => {
    try {
      await unAssignAdminPower({
        admin_id: newAdminId,
        company_id: companyId,
      }).unwrap();
      dispatch(succesToast("Разрешения успешно удалены"));
    } catch (error) {
      console.log(error);
    }
  };

  // const mainButton = Telegram.WebApp.MainButton;
  // const secondaryButton = Telegram.WebApp.SecondaryButton;
  // const { getParam } = useURLState();
  // const adminPowerState = Boolean(getParam("adminPower"));

  // useEffect(() => {
  //   if (admin && adminPowerState) {
  //     const emptyFunc = () => {};
  //     mainButton.offClick(emptyFunc);
  //     secondaryButton.offClick(emptyFunc);

  //     mainButton
  //       .setText("Сохранить")
  //       .onClick(() => handleSubmit())
  //       .show();

  //     secondaryButton
  //       .setParams({
  //         text: "Удалить",
  //         color: "#fff",
  //         text_color: "#eb4034",
  //       })
  //       .onClick(handleDeleteAdmin)
  //       .show();
  //   }

  //   return () => {
  //     secondaryButton.hide();
  //     mainButton.offClick(() => handleSubmit());
  //     secondaryButton.offClick(handleDeleteAdmin);
  //   };
  // }, [admin, adminPowerState, company]);

  return (
    <div className={`container ${styles.adminPowers}`}>
      {(isLoading ||
        isDeleting ||
        isLoadingAdmin ||
        isChangingAdmin ||
        isFetching) && <Loading />}
      <div className="adminList__List">
        <div className="adminList__list-main">
          <UserCard name={admin?.data?.full_name} />
        </div>
      </div>

      <div className={styles.adminPowers__holder}>
        <DropDownMenu
          toggle={
            <div className={styles.titleOneAdmin}>
              <ReactSVG src="./iconsSvg/settings.svg" />
              <h2>Изменение данных</h2>
            </div>
          }
          menu={
            <div className={styles.editAdminForm}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="ФИО"
                    name="full_name"
                    value={adminFormData.full_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="Имя пользователя"
                    name="username"
                    value={adminFormData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Новый пароль (оставьте пустым, чтобы не менять)"
                    name="password"
                    value={adminFormData.password}
                    onChange={handleInputChange}
                  />

                  <ReactSVG
                    src={
                      showPassword
                        ? "./Other/unVisible.svg"
                        : "./Other/visible.svg"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </form>
            </div>
          }
        />

        <DropDownMenu
          toggle={
            <div className={styles.titleOneAdmin}>
              <ReactSVG src="./iconsSvg/connect.svg" />
              <h2>Назначенные компании</h2>
            </div>
          }
          menu={
            currentAdminAssignedCompanys ? (
              <div className={styles.companiesList}>
                <div className={styles.connectedCompanies}>
                  <h4>Компании, назначенные текущему админу</h4>
                  {currentAdminAssignedCompanys?.data?.length > 0 ? (
                    <>
                      {currentAdminAssignedCompanys?.data.map(
                        (company: AssignedCompanyType) => (
                          <DropDownMenu
                            key={company._id}
                            toggle={
                              <FotoTextHint
                                image={
                                  company.logo
                                    ? getValidatedUrl(company.logo)
                                    : "./default.jpg"
                                }
                                title={company.name}
                                smallText={company.address || ""}
                                option="infoMenu"
                              />
                            }
                            menu={
                              <div>
                                <PermissionsList
                                  permissions={
                                    companyPermissions[company._id] || {}
                                  }
                                  onTogglePermission={(permissionKey) =>
                                    handleToggleCompanyPermission(
                                      company._id,
                                      permissionKey,
                                    )
                                  }
                                  isPermissionDisabled={(permissionKey) => {
                                    // Проверяем ограничения из assignedCompanies
                                    const assignedCompany =
                                      assignedCompanies?.data?.find(
                                        (ac: AssignedCompanyType) =>
                                          ac._id === company._id,
                                      );

                                    if (!assignedCompany?.permissions)
                                      return true;

                                    return !(
                                      assignedCompany.permissions as unknown as Record<
                                        string,
                                        boolean
                                      >
                                    )[permissionKey];
                                  }}
                                  onTooltipToggle={handleTooltipToggle}
                                  activeTooltip={activeTooltip}
                                  disabledTooltipText="Ограничено настройками компании"
                                  showSaveButton={true}
                                  showUnAssignButton={true}
                                  onSave={() =>
                                    handleSaveCompanyPermissions(company._id)
                                  }
                                  isSaving={
                                    isChangingAdmin ||
                                    isUnAssigning ||
                                    isLoading
                                  }
                                  hasChanges={hasCompanyPermissionsChanged(
                                    company._id,
                                  )}
                                  handleUnAssignAdminPower={() =>
                                    handleUnAssignAdminPower(company._id)
                                  }
                                />
                              </div>
                            }
                          />
                        ),
                      )}
                    </>
                  ) : (
                    <div className={styles.noCompanies}>
                      Нет доступных компаний
                    </div>
                  )}

                  <h4>Компании, доступные для назначения</h4>
                  {totalCompanies?.map((company: AssignedCompanyType) => (
                    <DropDownMenu
                      key={company._id}
                      toggle={
                        <FotoTextHint
                          image={
                            company?.logo
                              ? getValidatedUrl(company.logo)
                              : "./default.jpg"
                          }
                          title={company.name}
                          smallText={company.address || ""}
                          option="infoMenu"
                        />
                      }
                      menu={
                        <div>
                          <PermissionsList
                            permissions={companyPermissions[company._id] || {}}
                            onTogglePermission={(permissionKey) =>
                              handleToggleCompanyPermission(
                                company._id,
                                permissionKey,
                              )
                            }
                            isPermissionDisabled={(permissionKey) => {
                              // Проверяем ограничения из assignedCompanies
                              const assignedCompany =
                                assignedCompanies?.data?.find(
                                  (ac: AssignedCompanyType) =>
                                    ac._id === company._id,
                                );

                              if (!assignedCompany?.permissions) return true;

                              return !(
                                assignedCompany.permissions as unknown as Record<
                                  string,
                                  boolean
                                >
                              )[permissionKey];
                            }}
                            onTooltipToggle={handleTooltipToggle}
                            activeTooltip={activeTooltip}
                            disabledTooltipText="Ограничено настройками компании"
                            showSaveButton={true}
                            showUnAssignButton={false}
                            onSave={() =>
                              handleSaveCompanyPermissions(company._id)
                            }
                            isSaving={
                              isChangingAdmin || isUnAssigning || isLoading
                            }
                            hasChanges={hasCompanyPermissionsChanged(
                              company._id,
                            )}
                            handleUnAssignAdminPower={() =>
                              handleUnAssignAdminPower(company._id)
                            }
                          />
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              <h4>Ждем...</h4>
            )
          }
        />
      </div>

      <div className={styles.adminPowers__buttons}>
        <IconButton
          text="Удалить эту роль"
          styleName="deleteButton"
          onClick={handleDeleteAdmin}
        />
        <IconButton
          text="Подтвердить"
          styleName="linkColor"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default AdminPowers;
