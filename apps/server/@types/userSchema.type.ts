export interface ICitizen {
    name: string;
    password: string;
    phone: string;
    email?: string;
    district?: string;
    tehsil?: string;
    WSSC_CODE?: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
}
