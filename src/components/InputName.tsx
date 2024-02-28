import * as React from "react";

export interface IAppProps {}

const InputName = ({ isChecked }) => {
  return (
    <>
      {isChecked ? (
        <div>
          <label htmlFor="name">Enter your name</label>
          <input id="name" type="text" />
        </div>
      ) : null}
    </>
  );
};

export default InputName;
