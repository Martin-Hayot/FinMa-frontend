import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInstitutions = async (countryCode: string) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/institutions?country=${countryCode}`,
        {
            withCredentials: true,
        }
    );
    return data;
};

export const useGetInstitutions = (countryCode: string | null) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["institutions", countryCode],
        queryFn: () => fetchInstitutions(countryCode!),
        enabled: !!countryCode,
    });

    return { institutions: data, isLoading, isError };
};
