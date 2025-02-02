import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import UserStore from "../../../stores/user-store";
import Form from "../../UI/Form/Form";
import { User } from "../../Users/components/User";
import { fetchUsersByIds } from "../../../services/fetchUsersByIds";

interface User {
  userName: string;
  name: string;
  lastName: string;
  avatarURL: string;
}

export const SubscriptionsModal: React.FC = observer(() => {
  const { subscriptions } = UserStore; 
  const [subs, setSubs] = useState<User[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (subscriptions.length > 0) {
          const users = await fetchUsersByIds(subscriptions);
          setSubs(users);
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
