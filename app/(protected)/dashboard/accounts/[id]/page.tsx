"use client";

import { useParams } from "next/navigation";

// get id from the URL and display bank account details
const BankAccountPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Bank Account Details</h1>
            {/* Add account details here */}
            <p>Account ID: {id}</p>
            {/* You can fetch and display more details about the account here */}
        </div>
    );
};

export default BankAccountPage;
