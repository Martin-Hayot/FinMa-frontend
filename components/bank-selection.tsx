"use client";
import { Institution, useLinkStore } from "@/store/useLink";
import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const BankSelection = () => {
    const { countryCode, setInstitution } = useLinkStore();
    const [institutions, setInstitutions] = React.useState<Institution[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    useEffect(() => {
        if (countryCode) {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/gocardless/institutions/${countryCode}`,
                    {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    // Extract institutions from the nested response
                    setInstitutions(response.data.institutions || []);
                })
                .catch((error) => {
                    console.error("Error fetching institutions:", error);
                    setInstitutions([]);
                });
        }
    }, [countryCode]);

    return (
        <div>
            {countryCode && (
                <div className="space-y-2">
                    <h2>Select your bank</h2>
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
                                    onClick={() => setInstitution(institution)}
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
