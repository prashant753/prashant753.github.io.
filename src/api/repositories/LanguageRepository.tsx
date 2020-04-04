import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ILanguageRepository } from './interfaces';
import { IUserLanguages, IUserSettings, IAllLanguages } from '../models/Languages';

const ENDPOINTS = {
    getLanguages: () => `api/v1/admin/languages`,
    getUserSettings: (userId: number) => `api/v1/admin/users/${userId}/settings`,
};

class LanguageRepository implements ILanguageRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getLanguages = async (): Promise<IAllLanguages> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.getLanguages());
            return response as IAllLanguages;
        } catch (error) {
            return error;
        }
    }

    public getUserSettings = async (userId: number): Promise<IUserLanguages> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.getUserSettings(userId));
            return response.userSettings as IUserLanguages;
        } catch (error) {
            return error;
        }
    }

    public setUserSettings = async (userId: number, userSettings: IUserSettings): Promise<IUserLanguages> => {
        try {
            const response = await this.apiClient.put(ENDPOINTS.getUserSettings(userId), userSettings);
            return response.userSettings as IUserLanguages;
        } catch (error) {
            return error;
        }
    }

}

const languageRepository = new LanguageRepository(ApiClient);
export { languageRepository as LanguageRepository };
