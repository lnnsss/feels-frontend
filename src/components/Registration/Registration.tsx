import React, { useState } from "react";
import s from "./Registration.module.css"
import Form from "../UI/Form/Form";
import LabelInput from "../UI/LabelInput/LabelInput";
import axios, { AxiosError } from "axios";
import {apiURL} from "../../configs/constants.ts"

export const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleBtnClick = () => {
        const reg = async () => {
            try {
                const body = {
                    email: email,
                    password: password,
                    userName: userName,
                }
                const response = await axios.post(`${apiURL}/auth/registration`, body);
                console.log(response.data);
                setEmail("")
                setPassword("")
                setUserName("")
                setErrorMessage("")
                setMessage(response.data.message)
            } catch (err) {
                const axiosError = err as AxiosError<{ message: string }>;
                
                setMessage("")
                setErrorMessage(axiosError.response?.data.message || "Произошла ошибка при регистрации.");
                console.error(axiosError)
            }

        }
        reg()
    }

    return (
        <div className={s.registration}>
            <div className={`__container ${s.registration__container}`}>
                <Form>
                    <h3>Регистрация</h3>
                    <h4>{message}</h4>
                    <h5>{errorMessage}</h5>
                    <LabelInput element="email" text="Email" inputType="text" value={email} setValue={setEmail} />
                    <LabelInput element="password" text="Пароль" inputType="password" value={password} setValue={setPassword} />
                    <LabelInput element="userName" text="Юзернейм" inputType="text" value={userName} setValue={setUserName} />
                    <button onClick={handleBtnClick}>Зарегистрироваться</button>
                </Form>
            </div>
        </div>
    )
}