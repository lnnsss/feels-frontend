import React, { useState } from "react";
import s from "./Login.module.css"
import LabelInput from "../UI/LabelInput/LabelInput";
import axios, { AxiosError } from "axios";
import { apiURL } from "../../configs/constants";
import Form from "../UI/Form/Form";

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleBtnClick = () => {
        const login = async () => {
            try {
                const body = {
                    email: email,
                    password: password,
                }
                const response = await axios.post(`${apiURL}/auth/login`, body);
                console.log(response.data);
                setEmail("")
                setPassword("")
                setErrorMessage("")
                setMessage(response.data.message)
            } catch (err) {
                const axiosError = err as AxiosError<{ message: string }>;
                
                setMessage("")
                setErrorMessage(axiosError.response?.data.message || "Произошла ошибка при входе.");
                console.error(axiosError)
            }

        }
        login()
    }

    return (
        <div className={s.login}>
            <div className={`__container ${s.login__container}`}>
            <Form>
                    <h3>Вход</h3>
                    <h4>{message}</h4>
                    <h5>{errorMessage}</h5>
                    <LabelInput element="email" text="Email" inputType="text" value={email} setValue={setEmail} />
                    <LabelInput element="password" text="Пароль" inputType="password" value={password} setValue={setPassword} />
                    <button onClick={handleBtnClick}>Войти</button>
                </Form>
            </div>
        </div>
    )
}