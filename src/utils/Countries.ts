import { ICountry } from '../api/models/Permission';
import { IEcosystem } from '../api/models/Profile';
import { IPopularCity } from '../api/models/City';

export const combineCountriesIdsWithCountry = (selectedCountriesData: ICountry[]) => {
    let selectedCountries = '';
    selectedCountriesData.forEach((selectedcountry: ICountry) => {
        selectedCountries = selectedCountries + `country:${selectedcountry.id},`;
    });
    selectedCountries = selectedCountries.slice(0, -1);
    return selectedCountries;
};

export const combineDataIds = (data: ICountry[] | IEcosystem[]) => {
    let dataIds = '';
    data.map((value: ICountry | IEcosystem) => {
        dataIds = dataIds + `${value.id},`;
    });
    dataIds = dataIds.slice(0, -1);
    return dataIds;
};

export const combineCitiesIdsWithCity = (selectedCitiesData: IPopularCity[]) => {
    let selectedCities = '';
    selectedCitiesData.forEach((selectedCity: IPopularCity) => {
        selectedCities = selectedCities + `${selectedCity.id},`;
    });
    selectedCities = selectedCities.slice(0, -1);
    return selectedCities;
};
