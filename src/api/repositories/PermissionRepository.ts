import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IPermissionRepository } from './interfaces';
import { IPermissionResponse } from '../models/Permission';

const ENDPOINTS = {
    countries: (userId: number) => `api/v1/admin/users/${userId}/permissions`,
};

class PermissionRepository implements IPermissionRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getPermissions = async (userId: number): Promise<IPermissionResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.countries(userId));
            return response.permissions as IPermissionResponse;
        } catch (error) {
            return error;
        }
    }

}

const permissionRepository = new PermissionRepository(ApiClient);
export { permissionRepository as PermissionRepository };
