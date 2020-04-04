export interface ICity {
    id: number;
    countryId?: number;
    name: string;
    displayName: string;
    otherName?: string;
    isPopular?: boolean;
}

export interface ICityResponse {
    cities: ICity[];
}

export interface IPopularCity {
    id: string;
    countryId?: number;
    name: string;
    displayName: string;
    otherName?: string;
    isPopular?: boolean;
}
