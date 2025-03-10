import React, { useRef, useState } from "react";
import styles from "./SwipeableItem.module.scss";

interface SwipeableItemProps {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  onEdit,
  onDelete,
}) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const threshold = 80; // Порог для активации действия

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null || !isDragging) return;

    const diff = e.touches[0].clientX - startX;
    // Ограничиваем свайп в пределах -100px (влево) и 100px (вправо)
    const newX = Math.max(Math.min(diff, 100), -100);
    setCurrentX(newX);
  };

  const handleTouchEnd = () => {
    if (startX === null) return;

    // Если свайп достаточно сильный, выполняем действие
    if (currentX > threshold) {
      onEdit();
    } else if (currentX < -threshold) {
      onDelete();
    }

    // Возвращаем элемент в исходное положение
    setCurrentX(0);
    setStartX(null);
    setIsDragging(false);
  };

  // Обработчики для мыши (для тестирования на десктопе)
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX === null || !isDragging) return;

    const diff = e.clientX - startX;
    // Ограничиваем свайп в пределах -100px (влево) и 100px (вправо)
    const newX = Math.max(Math.min(diff, 100), -100);
    setCurrentX(newX);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleTouchEnd();
    }
  };

  // Определяем, насколько видны кнопки действий
  const editOpacity = Math.min(currentX / threshold, 1);
  const deleteOpacity = Math.min(-currentX / threshold, 1);

  return (
    <div className={styles.swipeableContainer} ref={containerRef}>
      {/* Фон с действиями */}
      <div className={styles.actionsBackground}>
        {/* Действие "Изменить" (справа) */}
        <div
          className={`${styles.actionEdit} ${
            editOpacity > 0.5 ? styles.actionActive : ""
          }`}
          style={{ opacity: editOpacity }}>
          <span>Изменить</span>
        </div>

        {/* Действие "Удалить" (слева) */}
        <div
          className={`${styles.actionDelete} ${
            deleteOpacity > 0.5 ? styles.actionActive : ""
          }`}
          style={{ opacity: deleteOpacity }}>
          <span>Удалить</span>
        </div>
      </div>

      {/* Основной контент */}
      <div
        ref={itemRef}
        className={styles.swipeableItem}
        style={{
          transform: `translateX(${currentX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </div>
  );
};

export default SwipeableItem;
