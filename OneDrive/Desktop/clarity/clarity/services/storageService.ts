
import { UserState } from '../types';

const STORAGE_KEY = 'CLARITY_TERMINAL_DATA_V2';

export const storageService = {
  saveUser: (user: UserState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  },
  
  getUser: (): UserState | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  logProgress: () => {
    const user = storageService.getUser();
    if (user) {
      user.completedToday = (user.completedToday || 0) + 1;
      storageService.saveUser(user);
    }
  }
};
