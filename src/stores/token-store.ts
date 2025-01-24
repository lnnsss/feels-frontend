import { makeAutoObservable } from "mobx";

class TokenStore {
  token: string = localStorage.getItem('jwt') || '';

  constructor() {
    makeAutoObservable(this);
  }

  setToken = (newToken: string): void => {
    this.token = newToken;
    localStorage.setItem('jwt', newToken); 
  };

  clearToken = (): void => {
    this.token = '';
    localStorage.removeItem('jwt');
  };
}

export default new TokenStore();