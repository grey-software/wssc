export interface ICitizen {
    name: string;
    password: string;
    phone: string;
    email?: string;
    district?: string;
    tehsil?: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
};
