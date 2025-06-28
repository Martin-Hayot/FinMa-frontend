"use client";

import { AlertTriangleIcon } from "lucide-react";

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="bg-destructive/30 p-3 rounded-md flex items-center gap-x-2 md:gap-x-4 text-sm text-red-600">
            <AlertTriangleIcon className="h-5 w-5" />
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
