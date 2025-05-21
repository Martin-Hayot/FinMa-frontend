import { Separator } from "@/components/ui/separator";

const SettingsNotificationsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Update your notification preferences, including how you
                    receive alerts and updates.
                </p>
            </div>
            <Separator />
            {/* <AccountForm /> */}
        </div>
    );
};

export default SettingsNotificationsPage;
