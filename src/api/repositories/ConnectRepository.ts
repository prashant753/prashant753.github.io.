import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IConnectRepository } from './interfaces';
import { IUserAddModal, IAddUserReponse } from '../models/AddUser';
import { LIMIT } from '../../constants/UserConstants';
import { IProfileResponse, IUserListData } from '../models/Profile';
import { ICountUser } from '../models/CountUser';
import { LocalStorage } from '../../utils/LocalStorage';
import { AUTH_TOKEN_STORAGE_KEY, BASE_URL } from '../../network/constants';

const ENDPOINTS = {
    getUsers: (
        role: string, status: boolean, page: number, selectedCountries: string,
        selectedEcosystems: string, selectedCities?: string) =>
        `/api/v1/admin/users/profiles?role=${role}&isActive=${status}&page=${page}` +
        `&limit=${LIMIT}&locations=${selectedCities ? selectedCities : selectedCountries}` +
        `&ecosystems=${selectedEcosystems}`,
    addUser: () => `/api/v1/admin/users`,
    uploadProfilePic: () => `/api/v1/files/profile_pics`,
    createUser: (userId: number) => `/api/v1/admin/users/${userId}/profiles?formatRevenue=true`,
    editUser: (userId: number) => `/api/v1/admin/users/${userId}/profiles?formatRevenue=true`,
    count: (countryIds: string, permissionCountries: string, permissionEcosystems: string) =>
        `/api/v1/admin/users/profiles/count?countries=${countryIds}` +
        `&locations=${permissionCountries}&ecosystems=${permissionEcosystems}`,
    search: (value: string, selectedCountries: string, permissionEcosystems: string, page: number) =>
        `/api/v1/admin/users/profiles?name=${value}&locations=${selectedCountries}&ecosystems=${permissionEcosystems}` +
        `&page=${page}&limit=${LIMIT}`,
    findUser: (email: string) => `/api/v2/users/${email}`,
};

class ConnectRepository implements IConnectRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getUsers = async (data: IUserListData): Promise<IProfileResponse> => {
        try {
            let response;
            if (data.selectedEcosystems) {
                response =
                    await this.apiClient.get(ENDPOINTS.getUsers(data.role, data.status, data.page,
                        data.selectedCountries, data.selectedEcosystems, data.selectedCities));
            } else {
                response =
                    await this.apiClient.get(ENDPOINTS.getUsers(data.role, data.status, data.page,
                        data.selectedCountries, '1,2', data.selectedCities));
            }
            return response as IProfileResponse;
        } catch (error) {
            return error;
        }
    }

    public download = async (data: any) => {
        try {
            const token: any = await LocalStorage.get(AUTH_TOKEN_STORAGE_KEY);
            const url = `${BASE_URL}/api/v1/admin/users/profiles/download?role=${data.role}` +
                `&isActive=${data.status}&page=${data.page}` +
                `&locations=${data.selectedCities ? data.selectedCities : data.selectedCountries}` +
                `&ecosystems=${data.selectedEcosystems ? data.selectedEcosystems : '1,2'}&authorization=Token ${token}`;

            const response = await this.apiClient.get(`/api/v1/admin/users/profiles/download?role=${data.role}` +
                `&isActive=${data.status}&page=${data.page}` +
                `&locations=${data.selectedCities ? data.selectedCities : data.selectedCountries}` +
                `&ecosystems=${data.selectedEcosystems ? data.selectedEcosystems : '1,2'}`);
            if (!response.error) {
                const link = document.createElement('a');
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    link.setAttribute('href', url);
                    link.setAttribute('download', `${data.role}.csv`);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } else {
                return response;
            }
        } catch (error) {
            return error;
        }
    }

    public addUser = async (user: IUserAddModal): Promise<IAddUserReponse> => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.addUser(), user);
            return response as IAddUserReponse;
        } catch (error) {
            return error;
        }
    }

    public uploadProfilePic = async (image: any): Promise<any> => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.uploadProfilePic(), image);
            return response;
        } catch (error) {
            return error;
        }
    }

    public createUser = async (data: any): Promise<any> => {
        try {

            const response = await this.apiClient.post(ENDPOINTS.createUser(data.user.userid),
                { profile: data.user.profile });
            return response;
        } catch (error) {
            return error;
        }
    }

    public editUser = async (data: any): Promise<any> => {
        try {

            const response = await this.apiClient.patch(ENDPOINTS.editUser(data.user.userid),
                { profile: data.user.profile });
            return response;
        } catch (error) {
            return error;
        }
    }

    public getUserCount = async (countryIds: string, permissionCountries: string, permissionEcosystems: string):
        Promise<ICountUser> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.count(
                countryIds, permissionCountries, permissionEcosystems));
            return response as ICountUser;
        } catch (error) {
            return error;
        }
    }

    public searchUser = async (
        query: string,
        selectedCountries: string,
        permissionEcosystems: string,
        page: number): Promise<IProfileResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.search(
                query,
                selectedCountries,
                permissionEcosystems,
                page));
            return response as IProfileResponse;
        } catch (error) {
            return error;
        }
    }

    public userProfileExist = async (email: string): Promise<any> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.findUser(email));
            return response;
        } catch (error) {
            return error;
        }
    }
}

const connectRepository = new ConnectRepository(ApiClient);
export { connectRepository as ConnectRepository };
