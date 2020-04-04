import { ICountry } from './Permission';

export interface ISubAdminResponse {
    subAdminPermissions: ISubAdmins[];
}

export interface ISubAdmins {
    email: string;
    permission: {
        countries: ICountry[];
        userId: number;
    };
}
