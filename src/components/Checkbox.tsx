import { useState } from "react";

interface IAppProps {}

const Checkbox: React.FunctionComponent<IAppProps> = ({
  isChecked,
  setIsChecked,
}) => {
  return (
    <div>
      <input
        id="rakingMode"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor="rakingMode">
        {" "}
        Select if you want play in ranking mode 🏆
      </label>
    </div>
  );
};

export default Checkbox;
