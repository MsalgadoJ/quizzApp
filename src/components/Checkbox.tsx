import { useState } from "react";

interface IAppProps {}

const Checkbox: React.FunctionComponent<IAppProps> = ({
  rankingModeIsChecked,
}) => {
  return (
    <div>
      <input
        id="rakingMode"
        type="checkbox"
        checked={rankingModeIsChecked}
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
