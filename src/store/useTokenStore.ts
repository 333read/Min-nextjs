// src/store/useTokenStore.ts
import { create } from 'zustand';

interface TokenState {
  token: string | null;
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  token: null,
  setToken: (newToken: string) => set({ token: newToken }),
  clearToken: () => set({ token: null }),
}));
