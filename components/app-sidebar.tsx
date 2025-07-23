"use client";

import * as React from "react";
import {
    IconDashboard,
    IconDatabase,
    IconFileWord,
    IconReport,
    IconSearch,
    IconSettings,
    IconAlertCircle,
    IconRefresh,
    IconCreditCard,
    // IconUsers,
} from "@tabler/icons-react";

// import { NavDocuments } from "@/components/navigation/nav-documents";
// import { NavMain } from "@/components/navigation/nav-main";
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
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/queries/account";
import { useRouter } from "next/navigation";

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
    const { accounts, isError, isLoading, refetch } = useGetAccounts();
    const router = useRouter();

    React.useEffect(() => {
        if (accounts?.length == 0) {
            router.push("/link");
        }
    }, [accounts, router]);

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
                {/* <NavMain
                    items={
                        navigation.navMain as unknown as {
                            title: string;
                            url: string;
                            icon?: LucideIcon | undefined;
                        }[]
                    }
                /> */}

                {/* Accounts Section */}
                <div className="px-2 py-4">
                    <div className="px-2 flex flex-row gap-x-1 items-center mb-2">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Bank Accounts
                        </h2>
                        <Button
                            asChild
                            className="w-7 h-7 px-2 text-muted-foreground"
                            variant={"ghost"}
                        >
                            <Link href={"/link"}>+</Link>
                        </Button>
                    </div>

                    {/* Bank Accounts Section */}
                    {isLoading || !accounts ? (
                        // Loading skeleton
                        <div className="space-y-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-auto p-3 rounded-lg border bg-card"
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex-shrink-0">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-3 w-12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        // Error state
                        <div className="p-3 mx-2 rounded-lg border border-destructive/20 bg-destructive/5">
                            <div className="flex items-center gap-2 mb-2">
                                <IconAlertCircle className="h-4 w-4 text-destructive" />
                                <span className="text-sm font-medium text-destructive">
                                    Failed to load accounts
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">
                                Unable to fetch your bank accounts. Please check
                                your connection and try again.
                            </p>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => refetch()}
                                className="w-full gap-2"
                            >
                                <IconRefresh className="h-3 w-3" />
                                Retry
                            </Button>
                        </div>
                    ) : accounts && accounts.length > 0 ? (
                        // Accounts list
                        <div className="space-y-1">
                            {accounts.map((account) => (
                                <Button
                                    className="h-auto p-3 hover:bg-accent/80 justify-start text-left w-full"
                                    variant="ghost"
                                    key={account.account_id}
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <IconCreditCard className="h-4 w-4 text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-sm font-medium truncate">
                                                    {account.name}
                                                </h3>
                                                <span className="text-sm font-semibold">
                                                    {account.balance_available}{" "}
                                                    {account.currency}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span className="capitalize">
                                                    {account.type}
                                                </span>
                                                <span className="font-mono">
                                                    {account.iban
                                                        ? `•••• ${account.iban.slice(
                                                              -4
                                                          )}`
                                                        : ""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    ) : (
                        // Empty state
                        <div className="p-4 mx-2 rounded-lg border border-dashed border-muted-foreground/25 text-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                    <IconCreditCard className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-1">
                                        No accounts connected
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        Connect your bank account to view your
                                        financial data
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full gap-2"
                                    asChild
                                >
                                    <Link href="/link">
                                        <IconCreditCard className="h-3 w-3" />
                                        Connect Bank Account
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

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
