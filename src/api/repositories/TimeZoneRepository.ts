import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ITimeZoneRepository } from './interfaces';
import { ITimeZoneResponse } from '../models/TimeZone';

const ENDPOINTS = {
    timeZone: () => `/api/v1/timezones`,
};

class TimeZoneRepository implements ITimeZoneRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getTimeZone = async (): Promise<ITimeZoneResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.timeZone());
            return response as ITimeZoneResponse;
        } catch (error) {
            return error;
        }
    }

}

const timeZoneRepository = new TimeZoneRepository(ApiClient);
export { timeZoneRepository as TimeZoneRepository };
