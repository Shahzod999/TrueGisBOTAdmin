import React, { useEffect } from "react";
import styles from "./OpenFromSide.module.scss";

interface OpenFromSideProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const OpenFromSide: React.FC<OpenFromSideProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}></div>

      <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </>
  );
};

export default OpenFromSide;
