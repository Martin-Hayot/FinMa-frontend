import { Separator } from "@/components/ui/separator";

const SettingsAppearancePage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                    Update your appearance settings, including your theme and
                    layout preferences.
                </p>
            </div>
            <Separator />
            {/* <AccountForm /> */}
        </div>
    );
};

export default SettingsAppearancePage;
