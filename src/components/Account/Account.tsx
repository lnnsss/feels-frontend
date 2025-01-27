import React, { useEffect } from "react";
import s from "./Account.module.css"
import TokenStore from "../../stores/token-store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../configs/constants";

export const Account: React.FC = observer(() => {
    const {clearToken, getID} = TokenStore
    const navigate = useNavigate();
    const id = getID();

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await axios.get(`${apiURL}/users/${id}`)
                console.log(response.data.content);
            } catch(err) {
                console.error(err);                
            }
        }
        fetchAccountInfo()
    }, [])

    const handleLogOut = (): void => {
        clearToken()
        navigate('/registration');
    }      

    return (
        <div className={s.account}>
            <div className={`__container ${s.account__container}`}>
                <h1>Личный кабинет</h1>
                <button onClick={handleLogOut}>Выйти</button>
            </div>
        </div>
    )
})