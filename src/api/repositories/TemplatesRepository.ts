import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ITemplatesRepository } from './interfaces';
import { ITemplate } from '../models/BulkUpload';

const ENDPOINTS = {
    getTemplate: (role: string, ecosystem: string) => `api/v1/admin/templates?role=${role}&ecosystem=${ecosystem}`,
};

class TemplatesRepository implements ITemplatesRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getTemplate = async (role: string, ecosystem: string): Promise<ITemplate> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.getTemplate(role, ecosystem));
            return response as ITemplate;
        } catch (error) {
            return error;
        }
    }
}

const templatesRepository = new TemplatesRepository(ApiClient);
export { templatesRepository as TemplatesRepository };
