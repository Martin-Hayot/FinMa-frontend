import AccountForm from "@/components/forms/account-form";
import { Separator } from "@/components/ui/separator";

const SettingsProfilePage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account information, including your name, email
                    address, and password.
                </p>
            </div>
            <Separator />
            <AccountForm />
        </div>
    );
};

export default SettingsProfilePage;
