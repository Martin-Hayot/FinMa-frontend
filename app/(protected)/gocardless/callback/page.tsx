"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAccountStore } from "@/store/useAccount";

const GoCardlessCallbackPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLinked, setIsLinked] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAccounts } = useAccountStore();

    const ref = searchParams.get("ref");

    // use the callback reference to update the requisition in the database
    // and retrieve the accounts associated with the user
    useEffect(() => {
        const updateRequisition = async () => {
            if (!ref) {
                setError("No reference parameter found");
                setLoading(false);
                return;
            }

            if (isLinked) {
                console.log("Already linked, skipping update");
                setLoading(false);
                return;
            }

            try {
                await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/gocardless/requisitions/${ref}/`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setIsLinked(true);
            } catch (err) {
                console.error("Error updating requisition:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to update requisition"
                );
            } finally {
                setLoading(false);
            }
        };

        updateRequisition();
    }, [ref, isLinked]);

    useEffect(() => {
        const retrieveAccounts = async () => {
            if (!isLinked) {
                console.log("Not linked, skipping account retrieval");
                setLoading(false);
                return;
            }
            axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(
                            `Failed to retrieve accounts: ${response.statusText}`
                        );
                    }
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
                    const accounts = response.data.map(
                        (account: AccountResponse) => ({
                            AccountId: account.account_id,
                            type: account.type,
                            name: account.name,
                            currency: account.currency,
                            balance: account.balance_available,
                            iban: account.iban,
                        })
                    );

                    // Set the accounts in the store
                    setAccounts(accounts);
                    // Redirect to accounts page or dashboard after successful retrieval
                    router.push("/dashboard");
                })
                .catch((err) => {
                    console.error("Error retrieving accounts:", err);
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to retrieve accounts"
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        retrieveAccounts();
    }, [isLinked, setAccounts, router]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
                <h1>Retrieving your accounts...</h1>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600 mx-auto mb-4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
                <h1 className="text-red-600">Error</h1>
                <p>{error}</p>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
            <h1>Accounts retrieved successfully!</h1>
            <p>Redirecting...</p>
        </div>
    );
};

export default GoCardlessCallbackPage;
