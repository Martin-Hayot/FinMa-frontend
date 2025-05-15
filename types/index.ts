export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isVerified?: boolean;
};
