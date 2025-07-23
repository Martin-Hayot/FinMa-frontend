"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const GoCardlessCallbackPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLinked, setIsLinked] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

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
