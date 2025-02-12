import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Form from "../../UI/Form/Form";
import { User } from "../../Users/components/User";
import axios from "axios";
import { apiURL } from "../../../configs/constants";
import { useStores } from "../../../stores/root-store-context";

interface User {
  userName: string;
  name: string;
  lastName: string;
  avatarURL: string;
}

export const SubscriptionsModal: React.FC = observer(() => {
  const [subs, setSubs] = useState<User[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const { 
    token: { getID },
    user: { subscriptions } 
  } = useStores();

  const id = getID()

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (subscriptions.length > 0) {
          const response = await axios.get(`${apiURL}/users/${id}/subscriptions`)
          setSubs(response.data.content);
        }
      } catch (error) {
        console.error("Не удалось загрузить подписанных пользователей:", error);
      } finally {
        setLoading(false); 
      }
    };

    loadUsers();
  }, [subscriptions]); 

  return (
    <Form>
      {loading ? (
        <span>Загрузка...</span> 
      ) : subs.length > 0 ? (
        subs.map((s, i) => (
          <User
            key={i} 
            userName={s.userName}
            name={s.name}
            lastName={s.lastName}
            avatarURL={s.avatarURL}
          />
        ))
      ) : (
        <p>Подписки отсутствуют.</p> 
      )}
    </Form>
  );
});
