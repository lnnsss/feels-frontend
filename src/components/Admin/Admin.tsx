import s from "./Admin.module.css";
import { observer } from "mobx-react-lite";
import { Statistic } from "./components/Statistic";
import { useEffect, useState } from "react";
import { apiPostsURL, apiUsersURL } from "../../configs/constants";
import axios from "axios";

interface CountResponse {
    message: string;
    content: number;
    err?: any; 
}

export const Admin: React.FC = observer(() => {
    const [usersCount, setUsersCount] = useState(0)
    const [postsCount, setPostsCount] = useState(0)

    useEffect(() => {
        const getCounts = async () => {
            try {
                const [usersResponse, postsResponse] = await Promise.all([
                    axios.get<CountResponse>(`${apiUsersURL}/count`),
                    axios.get<CountResponse>(`${apiPostsURL}/count`),
                ]);
                setUsersCount(usersResponse.data.content)
                setPostsCount(postsResponse.data.content)
            } catch(err) {
                console.error("Ошибка при получении количества пользователей и постов", err);                
            }
        }
        getCounts()
    }, [])

    return (
        <div className={s.admin}>
            <div className={`__container ${s.admin__container}`}>
                <div className={s.admin__statistics}>
                    <Statistic title="Количество пользователей на сайте" count={usersCount}/>
                    <Statistic title="Количество постов на сайте" count={postsCount}/>
                </div>
            </div>
        </div>
    )
})