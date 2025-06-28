import { create } from "zustand";

interface LinkStore {
    // Current step management
    currentStep: "country" | "institution" | "linking" | "complete";
    setCurrentStep: (step: LinkStore["currentStep"]) => void;

    // Existing state
    countryCode: string | null;
    setCountryCode: (code: string) => void;
    institution: Institution | null;
    setInstitution: (institution: Institution) => void;

    // Loading states
    isLoadingInstitutions: boolean;
    setIsLoadingInstitutions: (loading: boolean) => void;
    isConnecting: boolean;
    setIsConnecting: (connecting: boolean) => void;

    // Error handling
    error: string | null;
    setError: (error: string | null) => void;

    // Actions
    selectCountryAndFetchInstitutions: (countryCode: string) => Promise<void>;
    selectInstitutionAndConnect: (institution: Institution) => Promise<void>;
    reset: () => void;
}

export interface Institution {
    id: string;
    name: string;
    bic: string;
    countries: string[];
    logo: string;
}

export const useLinkStore = create<LinkStore>((set) => ({
    currentStep: "country",
    setCurrentStep: (step) => set({ currentStep: step }),

    countryCode: null,
    setCountryCode: (code) => set({ countryCode: code }),
    institution: null,
    setInstitution: (institution) => set({ institution }),

    isLoadingInstitutions: false,
    setIsLoadingInstitutions: (loading) =>
        set({ isLoadingInstitutions: loading }),
    isConnecting: false,
    setIsConnecting: (connecting) => set({ isConnecting: connecting }),

    error: null,
    setError: (error) => set({ error }),

    selectCountryAndFetchInstitutions: async (countryCode: string) => {
        set({ countryCode, currentStep: "institution" });
    },

    selectInstitutionAndConnect: async (institution: Institution) => {
        set({ institution, currentStep: "linking" });
    },

    reset: () =>
        set({
            currentStep: "country",
            countryCode: null,
            institution: null,
            isLoadingInstitutions: false,
            isConnecting: false,
            error: null,
        }),
}));
