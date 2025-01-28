import { observer } from "mobx-react-lite";
import { PostProps } from "./Account";
import s from "./Account.module.css"
import PostStore from "../../stores/post-store";
import UserStore from "../../stores/user-store";

export const Posts: React.FC = observer( () => {
    const {posts} = PostStore
    const {name} = UserStore;

    return (
        <div className={s.account__posts}>
            {posts.length 
            ? posts.map((p, i) => (
                <Post key={i} name={name} createdAt={p.createdAt} text={p.text} />
            ))
            : (<h4 className={s.account__posts__empty}>Оставьте свой первый пост!</h4>)
        }
        </div>
    )
} )

const Post: React.FC<PostProps> = observer(({ name, createdAt, text }: PostProps) => {
    return (
        <div className={s.account__post}>
            <div className={s.account__post__header}>
                <h3 className={s.account__post__name}>{name}</h3>
                <h4 className={s.account__post__date}>{createdAt}</h4>
            </div>
            <p className={s.account__post__text}>{text}</p>
        </div>
    );
});