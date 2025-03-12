import React, { useState } from "react";
import s from "./Registration.module.css"
import Form from "../UI/Form/Form";
import LabelInput from "../UI/LabelInput/LabelInput";
import axios, { AxiosError } from "axios";
import {apiURL} from "../../configs/constants.ts"
import { Link, useNavigate } from "react-router-dom";
import { useStores } from "../../stores/root-store-context.ts";
import Cookies from "js-cookie";

export const Registration: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { token: { setToken } } = useStores();
    const navigate = useNavigate();

    const handleBtnClick = () => {
        const reg = async () => {
            try {

                // тело запроса (форматирование имени, фамилии)
                const body = {
                    name: (name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()).trim(),
                    lastName: (lastName.trim().charAt(0).toUpperCase() + lastName.trim().slice(1).toLowerCase()).trim(),
                    email: email.trim(), 
                    password: password.trim(), 
                    userName: userName.trim()
                };

                // проверка на пустые поля
                if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim() ||!repeatPassword.trim() || !userName.trim()) {
                    return setErrorMessage("Все поля должны быть заполнены")
                }

                // проверка на совпадение паролей
                if (password != repeatPassword) {
                    return setErrorMessage("Пароли не совпадают")
                }

                // запрос на сервер
                const response = await axios.post(`${apiURL}/auth/registration`, body);
                console.log(response.data);

                // очистка полей
                setName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setRepeatPassword("")
                setUserName("")
                setErrorMessage("")

                // Сохранение токена в cookies
                setMessage(response.data.message);
                setToken(response.data.token);
                Cookies.set('jwt', response.data.token, { secure: true, sameSite: 'Strict' });

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
                    <LabelInput element="name" text="Имя" inputType="text" value={name} setValue={setName} />
                    <LabelInput element="lastName" text="Фамилия" inputType="text" value={lastName} setValue={setLastName} />
                    <LabelInput element="email" text="Email" inputType="text" value={email} setValue={setEmail} />
                    <LabelInput element="password" text="Пароль" inputType="password" value={password} setValue={setPassword} />
                    <LabelInput element="repeatPassword" text="Повтор пароля" inputType="password" value={repeatPassword} setValue={setRepeatPassword} />
                    <LabelInput element="userName" text="Юзернейм" inputType="text" value={userName} setValue={setUserName} />
                    <button onClick={handleBtnClick}>Зарегистрироваться</button>
                    <h6>Уже есть аккаунт? <Link className={s.registration__link} to="/login">Войти</Link></h6>
                </Form>
            </div>
        </div>
    )
}