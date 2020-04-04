import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ISkillRepository } from './interfaces';
import { ISkills, ISkillsReponse } from '../models/Category';

const ENDPOINTS = {
    skill: (ecosystemIds: string) => `/api/v1/skillGroups?include=skills&userEcosystemId=${ecosystemIds}`,
    allSkill: () => `/api/v1/skillGroups?include=skills`,
};

class SkillRepository implements ISkillRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getSkills = async (ecosystemIds: string): Promise<ISkills[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.skill(ecosystemIds));
            return response.skillGroups as ISkills[];
        } catch (error) {
            return error;
        }
    }
    public getAllSkills = async (): Promise<ISkillsReponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.allSkill());
            return response as ISkillsReponse;
        } catch (error) {
            return error;
        }
    }

}

const skillRepository = new SkillRepository(ApiClient);
export { skillRepository as SkillRepository };
