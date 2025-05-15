import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
} from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { User } from "@/store/useUser";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PlaidLinkProps {
    user: User;
    variant: "primary" | "ghost" | "outline";
}

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState("");
    useEffect(() => {
        const getLinkToken = async () => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/plaid/create_link_token`,
                {
                    user_id: user.id,
                }
            );
            const { link_token } = res.data;
            setToken(link_token);
        };

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token: string) => {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/plaid/exchange_public_token`,
                {
                    public_token,
                    user_id: user.id,
                }
            );
            router.push("/dashboard");
        },
        [user, router]
    );
    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <>
            {variant === "primary" ? (
                <Button onClick={() => open()} disabled={!ready}>
                    Connect with Plaid
                </Button>
            ) : variant === "ghost" ? (
                <Button
                    variant="ghost"
                    onClick={() => open()}
                    disabled={!ready}
                >
                    Connect with Plaid
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => open()}
                    disabled={!ready}
                >
                    Connect with Plaid
                </Button>
            )}
        </>
    );
};

export default PlaidLink;
