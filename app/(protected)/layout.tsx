"use client";

import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useUserStore();
    useEffect(() => {
        const fetchCurrentUser = async () => {
            await currentUser();
        };
        fetchCurrentUser();
    }, [currentUser]);
    return <div>{children}</div>;
};

export default ProtectedLayout;
