import create from "zustand/vanilla";

export interface AppStore {
  secretKey: string;
  setSecretKey: (secretKey: string) => void;
}

export const store = create<AppStore>((set) => ({
  secretKey: "",
  setSecretKey: (secretKey) => set((state) => ({ ...state, secretKey })),
}));
