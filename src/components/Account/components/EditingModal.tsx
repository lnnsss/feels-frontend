import { useState } from "react"
import Form from "../../UI/Form/Form"
import LabelInput from "../../UI/LabelInput/LabelInput"
import axios, { AxiosError } from "axios"
import { apiUsersURL } from "../../../configs/constants"
import { useStores } from "../../../stores/root-store-context"

export const EditingModal: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [avatarURL, setAvatarURL] = useState<string>("")
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { 
        modal: { closeModals },
        token: { getID },
        user: { setName: setNameUser, setLastName: setLastNameUser, setUserName: setUserNameUser, setAvatarURL: setAvatarURLUser, setStatus: setStatusUser }
    } = useStores();
    const id = getID();

    // Очистка полей
    const clearInputs = () => {
        setName("");
        setLastName("");
        setUserName("");
        setStatus("");
        setAvatarURL("");
    }

    // Запрос на сервер
    const handleChangeUserInfo = async (): Promise<void> => {
        try {
            // Берем только непустые поля
            const body = Object.fromEntries(
                Object.entries({
                    name,
                    lastName,
                    userName,
                    status,
                    avatarURL,
                }).filter(([_, value]) => value.trim() !== "")
            );
    
            const response = await axios.patch(`${apiUsersURL}/${id}`, body);
            setMessage(response.data.message);
            console.log("Профиль успешно обновлён:", response.data);

            // Обновляем профиль значениями из непустых полей
            if (body.name) setNameUser(body.name);
            if (body.lastName) setLastNameUser(body.lastName);
            if (body.userName) setUserNameUser(body.userName);
            if (body.status) setStatusUser(body.status);
            if (body.avatarURL) setAvatarURLUser(body.avatarURL);
    
            clearInputs();
            closeModals();
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setMessage("");
            setErrorMessage(axiosError.response?.data.message || "Произошла ошибка при обновлении профиля.");
            console.error(axiosError);
        }
    };

    return (
        <Form>
            <h3>Редактировать профиль</h3>
            <h4>{message}</h4>
            <h5>{errorMessage}</h5>
            <LabelInput element="name" text="Имя" inputType="text" value={name} setValue={setName} />
            <LabelInput element="lastName" text="Фамилия" inputType="text" value={lastName} setValue={setLastName} />
            <LabelInput element="userName" text="Юзернейм" inputType="text" value={userName} setValue={setUserName} />
            <LabelInput element="status" text="Статус" inputType="text" value={status} setValue={setStatus} />
            <LabelInput element="avatarURL" text="Аватар (url)" inputType="text" value={avatarURL} setValue={setAvatarURL} />
            <button onClick={handleChangeUserInfo}>Изменить</button>
        </Form>
    )
}