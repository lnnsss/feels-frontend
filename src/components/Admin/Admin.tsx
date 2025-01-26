import s from "./Admin.module.css";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import TokenStore from "../../stores/token-store";

export const Admin: React.FC = observer(() => {
    const {clearToken} = TokenStore
    const navigate = useNavigate();

    const handleLogOut = (): void => {
        clearToken()
        navigate('/registration');
    }      

    return (
        <div className={s.admin}>
            <div className={`__container ${s.admin__container}`}>
                <h1>админка</h1>
                <button onClick={handleLogOut}>Выйти</button>
            </div>
        </div>
    )
})