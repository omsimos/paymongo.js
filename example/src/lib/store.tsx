import { ReactNode, createContext, useContext, useState } from "react";

export type PaymentMethod = "dob" | "paymaya" | "gcash" | "grab_pay";

export interface StoreContextType {
  paymentMethod: PaymentMethod | null;
  setStore: <T extends keyof Omit<StoreContextType, "setStore">, V extends StoreContextType[T]>(
    key: T,
    value: V
  ) => void;
}

const defaultStoreValues: StoreContextType = {
  paymentMethod: null,
  setStore: () => {},
};

export const StoreContext = createContext<StoreContextType>(defaultStoreValues);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeValues, setStoreValues] =
    useState<StoreContextType>(defaultStoreValues);

  const setStore: StoreContextType["setStore"] = (key, value) => {
    setStoreValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <StoreContext.Provider value={{ ...storeValues, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
