export interface ITimeZone {
        id: number;
        countryCode: string;
        countryName: string;
        zoneName: string;
        gmtOffset: number;
        daylightSavingTime: boolean;
        displayName: string;
}

export interface ITimeZoneResponse {
        timeZones: ITimeZone;
}
