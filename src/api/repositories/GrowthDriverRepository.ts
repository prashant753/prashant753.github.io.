import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IGrowthDriverRepository } from './interfaces';
import { IAllGrowthDriverGroupResponse, IGrowthDriver } from '../models/GrowthDrivers';

const ENDPOINTS = {
    growthDrivers: (ecosystemIds: string) =>
        `/api/v1/growthDriverGroups?include=growthDrivers&userEcosystemId=${ecosystemIds}`,
    allGrowthDrivers: () =>
        `/api/v1/growthDriverGroups?include=growthDrivers`,
};

class GrowthDriverRepository implements IGrowthDriverRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getGrowthDrivers = async (ecosystemIds: string): Promise<IGrowthDriver[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.growthDrivers(ecosystemIds));
            return response.growthDriverGroups as IGrowthDriver[];
        } catch (error) {
            return error;
        }
    }

    public getAllGrowthDrivers = async (): Promise<IAllGrowthDriverGroupResponse[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.allGrowthDrivers());
            return response;
        } catch (error) {
            return error;
        }
    }

}

const growthDriverRepository = new GrowthDriverRepository(ApiClient);
export { growthDriverRepository as GrowthDriverRepository };
