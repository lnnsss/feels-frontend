import { ChangeEvent, useState } from "react";
import s from "./Account.module.css"
import { PostProps } from "./Account";
import UserStore from "../../stores/user-store";
import { apiURL } from "../../configs/constants";
import axios from "axios";
import TokenStore from "../../stores/token-store";
import PostStore from "../../stores/post-store";

interface PostBodyProps {
    userID: string | undefined,
    text: string
}

export const CreatePost: React.FC = () => {

    const [inputValue, setInputValue] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
    const {name} = UserStore;
    const { addPost } = PostStore
    const { getID } = TokenStore;
    const id = getID();

    // Взаимодействие с полем ввода
    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
        setInputError(false)
    }

    // Добавить новый пост
    const handleAddNewPost = (): void => {
        try {
            const add = async (): Promise<void> => {
                if (inputValue.trim()) {
                    const newPost: PostProps = {
                        name,
                        createdAt: new Date().toLocaleString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        text: inputValue
                    };
            
                    const body: PostBodyProps = {
                        userID: id,
                        text: inputValue
                    };
    
                    const response = await axios.post(`${apiURL}/posts`, body)
                            
                    addPost(newPost)
                    
                    setInputValue("");
                    setInputError(false)
                    console.log(response);     
                } else {
                    setInputError(true)
                }
            }
            add()
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className={s.account__createPost}>
            <input className={`${s.account__createPost__input} ${inputError && s.redOutline}`} type="text" value={inputValue} onChange={handleChangeInputValue} />
            <button onClick={handleAddNewPost}>Опубликовать</button>
        </div>
    )
}