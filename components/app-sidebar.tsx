"use client";

import * as React from "react";
import {
    IconDashboard,
    IconDatabase,
    IconFileWord,
    IconReport,
    IconSearch,
    IconSettings,
    // IconUsers,
} from "@tabler/icons-react";

// import { NavDocuments } from "@/components/navigation/nav-documents";
import { NavMain } from "@/components/navigation/nav-main";
import { NavSecondary } from "@/components/navigation/nav-secondary";
import { NavUser } from "@/components/navigation/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUser";
import { Skeleton } from "./ui/skeleton";
import { useAccountStore } from "@/store/useAccount";
import { Button } from "@/components/ui/button";

const navigation = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: IconSettings,
        },
        {
            title: "Search",
            url: "/dashboard/search",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "/dashboard/documents/data-library",
            icon: IconDatabase,
        },
        {
            name: "Reports",
            url: "/dashboard/documents/reports",
            icon: IconReport,
        },
        {
            name: "Word Assistant",
            url: "/dashboard/documents/word-assistant",
            icon: IconFileWord,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUserStore();
    const { accounts } = useAccountStore();
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/dashboard">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <span className="text-base font-semibold">
                                    FinMa
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain
                    items={
                        navigation.navMain as unknown as {
                            title: string;
                            url: string;
                            icon?: LucideIcon | undefined;
                        }[]
                    }
                />
                {accounts && accounts.length > 0 ? (
                    <div>
                        {accounts.map((account) => (
                            <div
                                className="p-4 transition-colors"
                                key={account.AccountId}
                            >
                                <h3 className="text-md font-semibold">
                                    {account.name} ({account.type})
                                </h3>
                                <p className="text-xs text-white/50">
                                    IBAN: {account.iban}
                                </p>
                                <p className="text-base text-white">
                                    {account.balance} {account.currency}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center">
                        <Button
                            variant={"outline"}
                            className="mt-2 w-full"
                            asChild
                        >
                            <Link href="/link">Connect Bank Account</Link>
                        </Button>
                        <p className="mt-2">No accounts available</p>
                    </div>
                )}
                {/* <NavDocuments
                    items={
                        data.documents as unknown as {
                            name: string;
                            url: string;
                            icon: LucideIcon;
                        }[]
                    }
                /> */}
                <NavSecondary
                    items={
                        navigation.navSecondary as unknown as {
                            title: string;
                            url: string;
                            icon: LucideIcon;
                        }[]
                    }
                    className="mt-auto"
                />
            </SidebarContent>
            <SidebarFooter>
                {user ? (
                    <NavUser
                        user={{
                            name: user?.firstName + " " + user?.lastName,
                            email: user?.email || "",
                            avatar: user?.avatar || "",
                        }}
                    />
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                size="lg"
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <Skeleton className="w-full h-fullrounded-lg" />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
