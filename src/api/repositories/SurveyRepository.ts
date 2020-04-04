import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ISurveyRepository } from './interfaces';
import { ISurveyResponse, IQuestionsResponse } from '../models/Survey';

const ENDPOINTS = {
    surveyResponses: (userId: number) => `/api/v1/admin/responses/${userId}`,
    questionaireResponse: (questionnaireId: string) => `/api/v1/admin/questions?questionaireId=${questionnaireId}`,
};

class SurveyRepository implements ISurveyRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getSurveyResponses = async (userId: number): Promise<ISurveyResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.surveyResponses(userId));
            return response as ISurveyResponse;
        } catch (error) {
            return error;
        }
    }

    public getQuestionaireResponse = async (questionnaireId: string): Promise<IQuestionsResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.questionaireResponse(questionnaireId));
            return response as IQuestionsResponse;
        } catch (error) {
            return error;
        }
    }
}

const surveyRepository = new SurveyRepository(ApiClient);
export { surveyRepository as SurveyRepository };
