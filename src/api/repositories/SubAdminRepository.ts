import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ISubAdminRepository } from './interfaces';
import { ISubAdminResponse } from '../models/SubAdmin';

const ENDPOINTS = {
    subAdmins: () => `/api/v1/admin/subAdmins`,
};

class SubAdminRepository implements ISubAdminRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getSubAdmins = async (): Promise<ISubAdminResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.subAdmins());
            return response as ISubAdminResponse;
        } catch (error) {
            return error;
        }
    }

}

const subAdminRepository = new SubAdminRepository(ApiClient);
export { subAdminRepository as SubAdminRepository };
