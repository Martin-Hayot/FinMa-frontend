import SettingsNavigation from "@/components/navigation/nav-settings";

const sidebarNavItems = [
    {
        title: "Account",
        href: "/dashboard/settings",
    },
    {
        title: "Appearance",
        href: "/dashboard/settings/appearance",
    },
    {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
    },
];

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/5 w-full">
                    <SettingsNavigation items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}
