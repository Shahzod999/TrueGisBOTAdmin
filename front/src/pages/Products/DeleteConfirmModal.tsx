import React from "react";
import styles from "./Products.module.scss";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Подтверждение удаления</h3>
        <p>
          Вы уверены, что хотите удалить <strong>{itemName}</strong>?
        </p>
        <p className={styles.warningText}>
          Это действие нельзя будет отменить.
        </p>
        <div className={styles.modalButtons}>
          <button
            className={`${styles.modalButton} ${styles.cancelButton}`}
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            className={`${styles.modalButton} ${styles.deleteButton}`}
            onClick={onConfirm}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
