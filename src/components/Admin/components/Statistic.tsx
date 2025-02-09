import s from "../Admin.module.css";
import { observer } from "mobx-react-lite";

interface IStatistic {
    title: string,
    count: number
}

export const Statistic: React.FC<IStatistic> = observer(({title, count = 0}) => {

    return (
        <div className={s.admin__statistic}>
            <h3 className={s.admin__statistic__title}>{title}</h3>
            <span className={s.admin__statistic__count}>{count}</span>
        </div>
    )
})