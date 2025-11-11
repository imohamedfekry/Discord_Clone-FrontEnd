import { create } from 'zustand';

interface UIState {
  activeServer: string | null;
  setActiveServer: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeServer: null,
  setActiveServer: (id) => set({ activeServer: id }),
}));