import React from "react";
import "./Switch.scss";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  id: string;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, id }) => {
  return (
    <div className="switch-container">
      <div className="switch-wrapper">
        <input
          checked={isOn}
          onChange={handleToggle}
          className="switch-checkbox"
          id={id}
          type="checkbox"
        />
        <label className="switch-label-toggle" htmlFor={id}>
          <span className="switch-button" />
        </label>
      </div>
    </div>
  );
};

export default Switch;
