import React from "react";
import styles from "./PermissionsList.module.scss";
import IconButton from "../Button/IconButton";

// Словарь для отображения названий разрешений
export const PERMISSION_NAMES: Record<string, string> = {
  admins: "Управление администраторами",
  analytics: "Аналитика",
  category: "Управление категориями",
  products: "Управление продуктами",
  comments: "Управление комментариями",
  discounts: "Управление скидками",
};

interface PermissionsListProps {
  // Разрешения для отображения
  permissions: Record<string, boolean>;
  // Функция для переключения разрешений
  onTogglePermission: (permissionKey: string) => void;
  // Функция для проверки, отключено ли разрешение
  isPermissionDisabled?: (permissionKey: string) => boolean;
  // Функция для отображения подсказки
  onTooltipToggle?: (index: number, e: React.MouseEvent) => void;
  // Активная подсказка
  activeTooltip?: number | null;
  // Текст подсказки для отключенных разрешений
  disabledTooltipText?: string;
  // Показывать ли кнопку сохранения
  showSaveButton?: boolean;
  // Функция для сохранения разрешений
  onSave?: () => void;
  // Загружается ли сохранение
  isSaving?: boolean;
  // Есть ли изменения для сохранения
  hasChanges?: boolean;
  // Функция для развязки разрешений
  handleUnAssignAdminPower?: () => void;
  showUnAssignButton: boolean;
}

const PermissionsList: React.FC<PermissionsListProps> = ({
  permissions,
  onTogglePermission,
  isPermissionDisabled = () => false,
  onTooltipToggle,
  activeTooltip = null,
  disabledTooltipText = "Недостаточно доступа",
  showSaveButton = false,
  onSave,
  isSaving = false,
  hasChanges = false,
  showUnAssignButton,
  handleUnAssignAdminPower,
}) => {
  return (
    <div className={styles.permissionsList}>
      {Object.keys(permissions).map((permission, index) => (
        <div
          className={styles.permissionItemHolder}
          key={`permission-${index}`}>
          <div className={styles.permissionItem}>
            <span>{PERMISSION_NAMES[permission]}</span>
            <div className={styles.switchWrapper}>
              <span
                style={{
                  fontSize: "10px",
                  color: "#999",
                  marginRight: "5px",
                }}>
                {permissions[permission] ? "Вкл" : "Выкл"}
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions[permission]}
                  onChange={() => onTogglePermission(permission)}
                  disabled={isPermissionDisabled(permission)}
                />
                <span className={styles.slider}></span>
              </label>
              {isPermissionDisabled(permission) && onTooltipToggle && (
                <div
                  className={`${styles.tooltipText} ${
                    activeTooltip === index ? styles.active : ""
                  }`}>
                  {disabledTooltipText}
                </div>
              )}
              {isPermissionDisabled(permission) && onTooltipToggle && (
                <button
                  className={styles.infoButton}
                  style={{ color: "#ff9800" }}
                  onClick={(e) => onTooltipToggle(index, e)}>
                  !
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className={styles.saveButtonWrapper}>
        {showUnAssignButton && (
          <IconButton
            isLoading={isSaving}
            text="Развязать"
            styleName="deleteButton"
            onClick={handleUnAssignAdminPower}
          />
        )}
        {showSaveButton && (
          <IconButton
            isLoading={isSaving || !hasChanges}
            text="Назначить"
            styleName="linkColor"
            onClick={onSave}
          />
        )}
      </div>
    </div>
  );
};

export default PermissionsList;
