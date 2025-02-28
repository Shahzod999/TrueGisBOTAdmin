import { useRef } from "react";

const ToastContainer = ({ toast }: { toast: any }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={toastRef} className={`toast-container ${toast.state}`}>
      <div className="check__text">
        <h2>{toast.text}</h2>
      </div>
    </div>
  );
};

export default ToastContainer;
