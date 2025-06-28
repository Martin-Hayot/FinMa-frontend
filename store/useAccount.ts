import { create } from "zustand";

export interface Account {
    AccountId: string;
    type: string;
    name: string;
    currency: string;
    balance: number;
    iban: string;
}

interface AccountStore {
    accounts: Account[] | null;
    setAccounts: (accounts: Account[]) => void;
    AddAccount: (account: Account) => void;
    clearAccounts: () => void;
    currentAccount: Account | null;
    updateAccount: (account: Partial<Account>) => void;
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
    updateAccount: (account) =>
        set((state) => ({
            accounts: state.accounts
                ? state.accounts.map((acc) =>
                      acc.AccountId === account.AccountId
                          ? { ...acc, ...account }
                          : acc
                  )
                : null,
        })),
}));
