import { create } from "zustand";

export interface Account {
    account_id: string;
    type: string;
    name: string;
    currency: string;
    balance_available: number;
    balance_current: number;
    institution_name: string;
    iban: string;
    created_at: string;
    updated_at: string;
}

interface AccountStore {
    accounts: Account[] | null;
    setAccounts: (accounts: Account[]) => void;
    AddAccount: (account: Account) => void;
    clearAccounts: () => void;
    currentAccount: Account | null;
}

export const useAccountStore = create<AccountStore>((set) => ({
    accounts: null,
    setAccounts: (accounts) => set({ accounts }),
    AddAccount: (account) =>
        set((state) => ({
            accounts: state.accounts ? [...state.accounts, account] : [account],
        })),
    clearAccounts: () => set({ accounts: null }),
    currentAccount: null,
}));
