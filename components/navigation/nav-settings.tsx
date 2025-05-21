"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

interface SettingsNavigation extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

const SettingsNavigation = ({
    className,
    items,
    ...props
}: SettingsNavigation) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative w-full">
            {/* Mobile hamburger menu button */}
            <button
                className="md:hidden flex items-center p-2 rounded-md hover:bg-muted"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <Menu className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium">Settings Menu</span>
            </button>

            <nav
                className={cn(
                    "flex-col md:flex-col space-y-1 w-full",
                    "md:flex",
                    isMenuOpen ? "flex" : "hidden",
                    "md:static absolute z-10 bg-background md:bg-transparent",
                    "md:mt-0 mt-2 p-2 md:p-0 rounded-md md:rounded-none border md:border-0 shadow-md md:shadow-none",
                    className
                )}
                {...props}
            >
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:underline hover:underline-offset-4",
                            "justify-start"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default SettingsNavigation;
