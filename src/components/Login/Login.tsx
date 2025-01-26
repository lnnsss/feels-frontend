import React, { useState } from "react";
import s from "./Login.module.css"
import LabelInput from "../UI/LabelInput/LabelInput";
import axios, { AxiosError } from "axios";
import { apiURL } from "../../configs/constants";
import Form from "../UI/Form/Form";
import TokenStore from "../../stores/token-store";
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setToken } = TokenStore;
    const navigate = useNavigate();

    const handleBtnClick = () => {
        const login = async () => {
            try {

                // тело запроса
                const body = {
                    email,
                    password,
                }

                // проверка на пустые поля
                if (!email.trim() || !password.trim()) {
                    return setErrorMessage("Все поля должны быть заполнены")
                }

                // запрос на сервер
                const response = await axios.post(`${apiURL}/auth/login`, body);
                console.log(response.data);

                // очистка полей
                setEmail("")
                setPassword("")
                setErrorMessage("")

                // сохранение токена и ответа
                setMessage(response.data.message)
                setToken(response.data.token)

                // переход на следующую страницу
                const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
                if (Array.isArray(tokenPayload.roles) && tokenPayload.roles.includes('ADMIN')) {
                    navigate('/admin'); 
                } else {
                    navigate('/account');
                }

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
                    <h6>Еше нет аккаунта? <Link className={s.login__link} to="/registration">Зарегистрироваться</Link></h6>
                </Form>
            </div>
        </div>
    )
}