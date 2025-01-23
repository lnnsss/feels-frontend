import React from "react";
import s from "./LabelInput.module.css";

interface Props {
  element: string;
  text: string;
  inputType: string;
  value: string;
  setValue: (value: string) => void;
}

const LabelInput: React.FC<Props> = ({ element, text, inputType, value, setValue }) => {
    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

  return (
    <div className={s.labelInput}>
      <label htmlFor={element}>{text}</label>
      <input id={element} type={inputType} value={value} onChange={handleChangeInputValue} />
    </div>
  );
};

export default LabelInput;