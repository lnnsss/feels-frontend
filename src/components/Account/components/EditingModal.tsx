import { useState } from "react"
import Form from "../../UI/Form/Form"
import LabelInput from "../../UI/LabelInput/LabelInput"
import axios from "axios"
import { apiURL } from "../../../configs/constants"
import TokenStore from "../../../stores/token-store"
import ModalStore from "../../../stores/modal-store"

export const EditingModal: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [avatarURL, setAvatarURL] = useState<string>("")
    const { closeModals } = ModalStore    
    const { getID } = TokenStore;
    const id = getID();

    // Запрос на сервер
    const handleChangeUserInfo = (): void => {
        try {
            const fetch = async () => {

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

                const response = await axios.patch(`${apiURL}/users/${id}`, body)
                console.log("Профиль успешно обновлён:", response.data);

                setName("")
                setLastName("")
                setUserName("")
                setStatus("")
                setAvatarURL("")
                closeModals()
            }
            fetch()
        } catch(err) {
            console.error("Ошибка при попытке редактирования профиля:", err);
        }      
    }

    return (
        <Form>
            <h3>Редактировать профиль</h3>
            <LabelInput element="name" text="Имя" inputType="text" value={name} setValue={setName} />
            <LabelInput element="lastName" text="Фамилия" inputType="text" value={lastName} setValue={setLastName} />
            <LabelInput element="userName" text="Юзернейм" inputType="text" value={userName} setValue={setUserName} />
            <LabelInput element="status" text="Статус" inputType="text" value={status} setValue={setStatus} />
            <LabelInput element="avatarURL" text="Аватар (url)" inputType="text" value={avatarURL} setValue={setAvatarURL} />
            <button onClick={handleChangeUserInfo}>Изменить</button>
        </Form>
    )
}