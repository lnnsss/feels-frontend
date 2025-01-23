import React from "react";
import s from "./Form.module.css";

interface Props {
  children: React.ReactNode;
}

const Form: React.FC<Props> = ({ children }) => {
  return (
    <div className={s.form}>
      <div className={s.form__container}>
        {children}
      </div>
    </div>
  );
};

export default Form;