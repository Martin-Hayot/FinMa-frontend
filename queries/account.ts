import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "@/store/useUser";
import { useAccountStore, Account } from "@/store/useAccount";
import { useEffect } from "react";

// Map the response data to the expected account structure
type AccountResponse = {
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
};

const fetchAccounts = async (): Promise<Account[]> => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts`,
        {
            withCredentials: true,
        }
    );
    return data as AccountResponse[];
};

export const useGetAccounts = () => {
    const { user } = useUserStore();
    const { setAccounts } = useAccountStore();

    const { data, isLoading, isError, refetch } = useQuery<Account[]>({
        // The query will not execute until the user is available
        enabled: !!user,
        queryKey: ["accounts", user?.id],
        queryFn: fetchAccounts,
    });

    useEffect(() => {
        if (data) {
            setAccounts(data);
        }
    }, [data, setAccounts]);

    return { accounts: data, isLoading, isError, refetch };
};
