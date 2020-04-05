import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IProfileRepository } from './interfaces';
import {
    IProfile,
    IEngagementResponse,
    IConsultingTypeResponse,
    IConsultingLevelsResponse,
    ITierResponse,
    IStagesResponse,
} from '../models/Profile';

const ENDPOINTS = {
    ecosystem: () => `/api/v1/ecosystems`,
    consultingType: () => `/api/v1/consultingTypes`,
    engagement: () => `/api/v1/engagements`,
    stages: () => `/api/v1/stages`,
    consultingLevel: () => `/api/v1/consultingLevels`,
    tiers: () => `/api/v1/tiers`,
    individualProfile: (
        userId: string, permissionCountries: string, permissionEcosystems: string) =>
        `/api/v1/admin/users/${userId}/profiles?formatRevenue=true&locations=${permissionCountries}` +
        `&ecosystems=${permissionEcosystems}`,
    tiersByEcosystem: (ecosystemId: number) => `/api/v1/tiers?ecosystemIds=${ecosystemId}`,
};

class ProfileRepository implements IProfileRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getProfile = async (
        userId: string, permissionCountries: string, permissionEcosystems: string): Promise<IProfile> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.individualProfile(
                userId, permissionCountries, permissionEcosystems));
            return response as IProfile;
        } catch (error) {
            return error;
        }
    }

    public getEcosystems = async (): Promise<IEngagementResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.ecosystem());
            return response;
        } catch (error) {
            return error;
        }
    }

    public getConsultingType = async (): Promise<IConsultingTypeResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.consultingType());
            return response;
        } catch (error) {
            return error;
        }
    }

    public getEngagements = async (): Promise<IEngagementResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.engagement());
            return response;
        } catch (error) {
            return error;
        }
    }

    public getConsultingLevel = async (): Promise<IConsultingLevelsResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.consultingLevel());
            return response;
        } catch (error) {
            return error;
        }
    }

    public getTiers = async (): Promise<ITierResponse[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.tiers());
            return response;
        } catch (error) {
            return error;
        }
    }

    public getTiersByEcosystem = async (ecosystemId: number): Promise<ITierResponse[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.tiersByEcosystem(ecosystemId));
            return response;
        } catch (error) {
            return error;
        }
    }

    public getStages = async (): Promise<IStagesResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.stages());
            return response;
        } catch (error) {
            return error;
        }
    }
}

const profileRepository = new ProfileRepository(ApiClient);
export { profileRepository as ProfileRepository };
