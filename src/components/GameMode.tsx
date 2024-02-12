import React, { useState } from "react";
import InputName from "./InputName";
import Checkbox from "./Checkbox";

type Props = {};

function GameMode({}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <InputName isChecked={isChecked} />
      <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  );
}

export default GameMode;
