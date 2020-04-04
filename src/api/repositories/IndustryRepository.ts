import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IIndustryRepository } from './interfaces';
import { IIndustries, IIndustriesResponse } from '../models/Category';

const ENDPOINTS = {
    industry: (ecosystemIds: string) => `/api/v1/industryGroups?include=industries&userEcosystemId=${ecosystemIds}`,
    allIndustry: () => `/api/v1/industryGroups?include=industries`,
};

class IndustryRepository implements IIndustryRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getIndustries = async (ecosystemIds: string): Promise<IIndustries[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.industry(ecosystemIds));
            return response.industryGroups as IIndustries[];
        } catch (error) {
            return error;
        }
    }

    public getAllIndustries = async (): Promise<IIndustriesResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.allIndustry());
            return response as IIndustriesResponse;
        } catch (error) {
            return error;
        }
    }

}

const industryRepository = new IndustryRepository(ApiClient);
export { industryRepository as IndustryRepository };
