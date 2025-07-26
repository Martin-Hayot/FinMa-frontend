"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
    let pathname = usePathname();

    pathname = pathname.split("/").filter(Boolean).at(-1) || "Dashboard";

    // if pathname is a uuid (e.g., account ID), replace it with "Account"
    if (
        pathname.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        )
    ) {
        pathname = "Account";
    }

    pathname = pathname[0].toUpperCase() + pathname.slice(1); // capitalize first letter
    pathname = pathname.replaceAll("-", " "); // replace all dashes with spaces

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base py-1 font-medium">{pathname}</h1>
            </div>
        </header>
    );
}
