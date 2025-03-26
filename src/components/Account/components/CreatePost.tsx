import s from "./../Account.module.css";
import React, {ChangeEvent, useRef, useState} from "react";
import axios from "axios";
import {apiPostsURL} from "../../../configs/constants";
import { useStores } from "../../../stores/root-store-context";

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
    const inputRef = useRef<HTMLInputElement>(null);
    const { 
        post: { addPost },
        token: { getID },
        user: { name }
    } = useStores();
    
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
                createdAt: `${new Date().toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })} ${new Date().toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })}`,
                text: inputValue,
                color: colorValue,
            };

            const body: PostBodyProps = {
                userID: id,
                text: inputValue,
                color: colorValue,
            };

            await axios.post(`${apiPostsURL}`, body);

            // Возвращаем фокус в input
            if (inputRef.current) {
                inputRef.current.focus();
            }

            addPost(newPost);
            setInputValue("");
            setInputError(false);
        } catch (err) {
            console.error("Ошибка при добавлении поста:", err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Предотвращаем перенос строки в input
            handleAddNewPost();
        }
    };

    return (
        <div className={s.account__createPost}>
            <div className={s.account__createPost__inputs}>
                <input
                    ref={inputRef}
                    className={`${s.account__createPost__textInput} ${inputError && s.redOutline}`}
                    type="text"
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    onKeyDown={handleKeyDown}
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