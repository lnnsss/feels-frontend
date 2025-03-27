import { observer } from "mobx-react-lite";
import s from "./../Profile.module.css"
import { useStores } from "../../../stores/root-store-context";

export interface PostProps {
    name: string;
    createdAt: string; 
    text: string;
    color: string;
}

export const Posts: React.FC = observer( () => {
    const {
        profile: {name, posts}
    } = useStores();

    return (
        <div className={s.profile__posts}>
            {posts.length 
            ? posts.map((p, i) => (
                <Post key={i} name={name} createdAt={p.createdAt} text={p.text} color={p.color} />
            ))
            : (<h4 className={s.profile__posts__empty}>Ещё нет постов</h4>)
        }
        </div>
    )
})

const Post: React.FC<PostProps> = observer(({ name, createdAt, text, color }: PostProps) => {    
    return (
        <div className={s.profile__post} style={{ border: `2px solid ${color}` }}>
            <div className={s.profile__post__header}>
                <h3 className={s.profile__post__name}>{name}</h3>
                <h4 className={s.profile__post__date}>{createdAt}</h4>
            </div>
            <p className={s.profile__post__text}>{text}</p>
        </div>
    );
});