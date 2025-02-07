import s from "./Admin.module.css";
import { observer } from "mobx-react-lite";
import Header from "./components/Header/Header";

export const Admin: React.FC = observer(() => {

    return (
        <div className={s.admin}>
            <div className={`__container ${s.admin__container}`}>
                <h2>админка</h2>
            </div>
        </div>
    )
})