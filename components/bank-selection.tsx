"use client";
import { Institution, useLinkStore } from "@/store/useLink";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ErrorMessage from "./error-message";
import { useRouter } from "next/navigation";

const BankSelection = () => {
    const {
        countryCode,
        selectInstitutionAndConnect,
        // isLoadingInstitutions,
        setIsLoadingInstitutions,
        error,
        setError,
        isConnecting,
    } = useLinkStore();
    const [institutions, setInstitutions] = React.useState<Institution[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const router = useRouter();

    useEffect(() => {
        if (countryCode) {
            setIsLoadingInstitutions(true);
            setError(null);

            axios
                .get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/gocardless/institutions/${countryCode}`,
                    {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    setInstitutions(response.data.institutions || []);
                })
                .catch((error) => {
                    console.error("Error fetching institutions:", error);
                    setError("Failed to load institutions");
                    setInstitutions([]);
                })
                .finally(() => {
                    setIsLoadingInstitutions(false);
                });
        }
    }, [countryCode, setIsLoadingInstitutions, setError]);

    const handleInstitutionSelect = async (institution: Institution) => {
        await selectInstitutionAndConnect(institution);
        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/gocardless/link`,
                {
                    institution_id: institution.id,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res: AxiosResponse) => {
                router.push(res.data.link);
            })
            .catch((error) => {
                console.error("Error connecting to bank:", error);
                setError("Failed to connect to your bank");
            });
    };

    return (
        <div>
            {error && (
                <ErrorMessage message={"Error connecting to your bank"} />
            )}
            {countryCode && (
                <div className="space-y-2">
                    <Input
                        type="text"
                        placeholder="Search for a bank"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="my-4"
                    />
                    <ScrollArea className="h-96 flex flex-col gap-2">
                        {institutions
                            .filter((institution) =>
                                institution.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            .map((institution) => (
                                <Button
                                    key={institution.id}
                                    variant="outline"
                                    className="w-[96%] flex items-center mb-2 h-16 justify-start px-4"
                                    onClick={() =>
                                        handleInstitutionSelect(institution)
                                    }
                                    disabled={isConnecting}
                                >
                                    <Image
                                        src={institution.logo}
                                        alt={institution.name}
                                        width={20}
                                        height={20}
                                        className="h-8 w-8 rounded-sm"
                                    />
                                    <span className="truncate">
                                        {institution.name}
                                        {isConnecting && " (Connecting...)"}
                                    </span>
                                </Button>
                            ))}
                    </ScrollArea>
                </div>
            )}
        </div>
    );
};

export default BankSelection;
