export interface AppStore {
    secretKey: string;
    setSecretKey: (secretKey: string) => void;
}
export declare const store: import("zustand/vanilla").StoreApi<AppStore>;
