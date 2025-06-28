"use client";
import { useLinkStore } from "@/store/useLink";
import BankSelection from "./bank-selection";
import CountrySelection from "./country-selection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ErrorMessage from "./error-message";

const BankConnect = () => {
    const { currentStep, setCurrentStep, reset, institution, error } =
        useLinkStore();

    const handleBack = () => {
        switch (currentStep) {
            case "institution":
                setCurrentStep("country");
                break;
            case "linking":
                setCurrentStep("institution");
                break;
            default:
                break;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case "country":
                return <CountrySelection />;
            case "institution":
                return <BankSelection />;
            case "linking":
                return (
                    <div className="text-center p-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600 mx-auto mb-4"></div>
                        <p>Connecting to {institution?.name}...</p>
                        <div className="mt-4">
                            {error && <ErrorMessage message={error} />}
                        </div>
                    </div>
                );
            case "complete":
                return (
                    <div className="text-center p-6">
                        <p className="text-green-600 mb-4">
                            Successfully connected!
                        </p>
                        <Button onClick={reset}>Connect Another Bank</Button>
                    </div>
                );
            default:
                return <CountrySelection />;
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            {/* Header with back button */}
            <div className="flex items-center mb-6">
                {currentStep !== "country" && currentStep !== "complete" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mr-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                )}
                <h1 className="text-xl font-semibold">
                    {currentStep === "country" && "Select Country"}
                    {currentStep === "institution" && "Choose Your Bank"}
                    {currentStep === "linking" && "Connecting..."}
                    {currentStep === "complete" && "Connection Complete"}
                </h1>
            </div>

            {/* Progress indicator */}
            <div className="flex mb-6">
                <div
                    className={`flex-1 h-2 rounded-l ${
                        currentStep !== "country"
                            ? "bg-blue-500"
                            : "bg-gray-200"
                    }`}
                />
                <div
                    className={`flex-1 h-2 ${
                        currentStep === "linking" || currentStep === "complete"
                            ? "bg-blue-500"
                            : "bg-gray-200"
                    }`}
                />
                <div
                    className={`flex-1 h-2 rounded-r ${
                        currentStep === "complete"
                            ? "bg-blue-500"
                            : "bg-gray-200"
                    }`}
                />
            </div>

            {/* Step content */}
            {renderStepContent()}
        </div>
    );
};

export default BankConnect;
