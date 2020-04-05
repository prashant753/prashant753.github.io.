import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IInvitationRepository } from './interfaces';
import { IInvitation } from '../models/Invitation';
import { IBulkInvitation } from '../models/BulkInvitation';

const ENDPOINTS = {
    invite: (userId: number) => `api/v1/admin/users/${userId}/invite`,
    bulkInvite: (userIds: string) => `/api/v1/admin/users/invite?ids=${userIds}`,

};

class InvitationRepository implements IInvitationRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public sendInvite = async (userId: number): Promise<IInvitation> => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.invite(userId));
            return response as IInvitation;
        } catch (error) {
            return error;
        }
    }

    public sendBulkInvite = async (userIds: string): Promise<IBulkInvitation> => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.bulkInvite(userIds));
            return response as IBulkInvitation;
        } catch (error) {
            return error;
        }
    }

}

const invitationRepository = new InvitationRepository(ApiClient);
export { invitationRepository as InvitationRepository };
