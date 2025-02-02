import s from "./../Account.module.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import UserStore from "../../../stores/user-store";
import { apiURL } from "../../../configs/constants";
import TokenStore from "../../../stores/token-store";
import PostStore from "../../../stores/post-store";

export interface PostProps {
    name: string;
    createdAt: string; 
    text: string;
    color: string;
}

interface PostBodyProps {
    userID: string | undefined;
    text: string;
    color: string;
}

export const CreatePost: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [colorValue, setColorValue] = useState<string>("#000000");
    const [inputError, setInputError] = useState<boolean>(false);
    const { name } = UserStore;
    const { addPost } = PostStore;
    const { getID } = TokenStore;
    const id = getID();

    // Обработка изменения текста
    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
        setInputError(false);
    };

    // Обработка изменения цвета
    const handleChangeColorValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setColorValue(e.target.value);
        
    };

    // Добавление нового поста
    const handleAddNewPost = async (): Promise<void> => {
        if (!inputValue.trim()) {
            setInputError(true);
            return;
        }

        try {
            const newPost: PostProps = {
                name,
                createdAt: new Date().toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                text: inputValue,
                color: colorValue,
            };

            const body: PostBodyProps = {
                userID: id,
                text: inputValue,
                color: colorValue,
            };

            await axios.post(`${apiURL}/posts`, body);

            addPost(newPost);
            setInputValue("");
            setInputError(false);
        } catch (err) {
            console.error("Ошибка при добавлении поста:", err);
        }
    };

    return (
        <div className={s.account__createPost}>
            <div className={s.account__createPost__inputs}>
                <input
                    className={`${s.account__createPost__textInput} ${inputError && s.redOutline}`}
                    type="text"
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    placeholder="Введите текст"
                />
                <input
                    className={s.account__createPost__colorInput}
                    type="color"
                    value={colorValue}
                    onChange={handleChangeColorValue}
                    title="Цвет поста"
                />
            </div>
            <button onClick={handleAddNewPost}>Опубликовать</button>
        </div>
    );
};