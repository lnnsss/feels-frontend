import { ChangeEvent, useState } from "react";
import s from "./Account.module.css";
import UserStore from "../../stores/user-store";
import { apiURL } from "../../configs/constants";
import axios from "axios";
import TokenStore from "../../stores/token-store";
import PostStore from "../../stores/post-store";
import { PostProps } from "./Account";

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
            };

            const body: PostBodyProps = {
                userID: id,
                text: inputValue,
                color: colorValue,
            };

            const response = await axios.post(`${apiURL}/posts`, body);
            console.log(response);

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
                />
            </div>
            <button onClick={handleAddNewPost}>Опубликовать</button>
        </div>
    );
};