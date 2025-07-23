import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";

const fetchCurrentUser = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
        {
            withCredentials: true,
        }
    );
    return data;
};

export const useCurrentUser = () => {
    const { setUser } = useUserStore();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: fetchCurrentUser,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    return { user: data, isLoading, isError };
};
