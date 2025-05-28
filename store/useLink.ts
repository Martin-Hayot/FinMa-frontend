import { create } from "zustand";

interface LinkStore {
    countryCode: string | null;
    setCountryCode: (code: string) => void;
    institution: Institution | null;
    setInstitution: (institution: Institution) => void;
}

export interface Institution {
    id: string;
    name: string;
    bic: string;
    countries: string[];
    logo: string;
}

export const useLinkStore = create<LinkStore>((set) => ({
    countryCode: null,
    setCountryCode: (code) => set({ countryCode: code }),
    institution: null,
    setInstitution: (institution) => set({ institution }),
}));
