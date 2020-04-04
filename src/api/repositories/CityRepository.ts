import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { ICityRepository } from './interfaces';
import { ICity, IPopularCity, ICityResponse } from '../models/City';

const ENDPOINTS = {
    city: (countries: string, city: string, permissionCountries: string, permissionEcosystems: string) =>
        `/api/v1/admin/cities?searchTerm=${city}&countries=${countries}` +
        `&locations=${permissionCountries}&ecosystems=${permissionEcosystems}`,
    cityByName: (city: string) => `/api/v1/cities?searchTerm=${city}`,
    allCities: (countries: string, permissionCountries: string, permissionEcosystems: string) =>
        `/api/v1/admin/profiles/locations?countries=${countries}&locations=${permissionCountries}` +
        `&ecosystems=${permissionEcosystems}`,
};

class CityRepository implements ICityRepository {
    private apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this.apiClient = apiClient;
    }

    public getCities = async (
        countries: string,
        city: string,
        permissionCountries: string,
        permissionEcosystems: string): Promise<ICityResponse> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.city(
                countries, city, permissionCountries, permissionEcosystems));
            return response as ICityResponse;
        } catch (error) {
            return error;
        }
    }

    public getCityByName = async (city: string): Promise<ICity[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.cityByName(city));
            return response.cities as ICity[];
        } catch (error) {
            return error;
        }
    }

    public getAllCities = async (
        countries: string, permissionCountries: string, permissionEcosystems: string): Promise<IPopularCity[]> => {
        try {
            const response = await this.apiClient.get(ENDPOINTS.allCities(
                countries, permissionCountries, permissionEcosystems));
            const cities = response.locations.length > 0 ? (response.locations.filter((data: any) => {
                return data.id.replace(/[0-9]/g, '') === 'city:';
            })) : [];
            return cities as IPopularCity[];
        } catch (error) {
            return error;
        }
    }
}

const cityRepository = new CityRepository(ApiClient);
export { cityRepository as CityRepository };
