import { IEcosystem } from './Profile';

export interface ICountry {
    id: number;
    name: string;
}

export interface IPermissionResponse {
    permissions: {
        countries: ICountry[],
        ecosystems: IEcosystem[],
        userId: number,
        _id: string,
    };
}
