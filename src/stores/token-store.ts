import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";

class TokenStore {
  token: string = Cookies.get('jwt') || '';
  isAdmin: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.updateRoles();
  }

  setToken = (newToken: string): void => {
    this.token = newToken;
    Cookies.set('jwt', newToken, { secure: true, sameSite: 'Strict' });
    this.updateRoles();
  };

  clearToken = (): void => {
    this.token = '';
    Cookies.remove('jwt');
    this.isAdmin = false;
  };

  getID = (): string | undefined => {
    if (this.token) {
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        return payload._id;
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
        return undefined;
      }
    }
  };

  updateRoles = (): void => {
    if (this.token) {
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        this.isAdmin = Array.isArray(payload.roles) && payload.roles.includes('ADMIN');
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
        this.isAdmin = false;
      }
    }
  };

  hasRole = (role: string): boolean => {
    if (this.token) {
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        return Array.isArray(payload.roles) && payload.roles.includes(role);
      } catch (error) {
        console.error("Ошибка при проверке роли:", error);
        return false;
      }
    } else {
      return false;
    }
  };
}

export default new TokenStore();
