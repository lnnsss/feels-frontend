import axios from "axios";
import { apiURL } from "../configs/constants";

interface User {
  _id: string;
  userName: string;
  name: string;
  lastName: string;
  avatarURL: string;
}

export const fetchUsersByIds = async (ids: string[]): Promise<User[]> => {
  try {
    const requests = ids.map((id) => axios.get(`${apiURL}/users/${id}`));
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data.content); 
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    throw error;
  }
};
