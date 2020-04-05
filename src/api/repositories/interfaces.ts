import { ILoginModel } from '../models/User';
import { IInvitation } from '../models/Invitation';
import { IAllGrowthDriverGroupResponse, IGrowthDriver } from '../models/GrowthDrivers';
import { ITimeZoneResponse } from '../models/TimeZone';
import { ICity, IPopularCity, ICityResponse } from '../models/City';
import { IProfile, IProfileResponse, IUserListData } from '../models/Profile';
import { ISkills, ISkillsReponse } from '../models/Category';
import { IUserLanguages, IUserSettings, IAllLanguages } from '../models/Languages';
import { IPermissionResponse } from '../models/Permission';
import { ISurveyResponse, IQuestionsResponse } from '../models/Survey';
import { ISubAdminResponse } from '../models/SubAdmin';

export interface IUserRepository {
  login(user: ILoginModel): Promise<any>;
  refreshToken(): Promise<any>;
}

export interface IConnectRepository {
  getUsers(data: IUserListData): Promise<IProfileResponse>;
  download(data: IUserListData): void;
}

export interface ISkillRepository {
  getSkills(ecosystemId: string): Promise<ISkills[]>;
  getAllSkills(): Promise<ISkillsReponse>;
}

export interface ISubSkillRepository {
  getSubSkills(data: any): Promise<any>;
}

export interface IIndustryRepository {
  getIndustries(data: any): Promise<any>;
}

export interface ISubIndustryRepository {
  getSubIndustries(data: any): Promise<any>;
}

export interface ICityRepository {
  getCities(countryIds: string, cityName: string, permissionCountries: string, permissionEcosystems: string)
    : Promise<ICityResponse>;
  getCityByName(cityName: string): Promise<ICity[]>;
  getAllCities(countryIds: string, permissionCountries: string, permissionEcosystems: string): Promise<IPopularCity[]>;
}

export interface ITimeZoneRepository {
  getTimeZone(): Promise<ITimeZoneResponse>;
}

export interface ISubAdminRepository {
  getSubAdmins(): Promise<ISubAdminResponse>;
}

export interface IInvitationRepository {
  sendInvite(userId: number): Promise<IInvitation>;
}

export interface ITemplatesRepository {
  getTemplate(role: string, ecosystem: string): Promise<any>;
}

export interface IProfileRepository {
  getProfile(userId: string, permissionCountries: string, permissionEcosystems: string): Promise<IProfile>;
}

export interface ISurveyRepository {
  getSurveyResponses(userId: number): Promise<ISurveyResponse>;
  getQuestionaireResponse(questionnaireId: string): Promise<IQuestionsResponse>;
}

export interface IGrowthDriverRepository {
  getGrowthDrivers(ecosystemId: string): Promise<IGrowthDriver[]>;
  getAllGrowthDrivers(): Promise<IAllGrowthDriverGroupResponse[]>;
}

export interface IPermissionRepository {
  getPermissions(userId: number): Promise<IPermissionResponse>;
}

export interface ILanguageRepository {
  getLanguages(): Promise<IAllLanguages>;
  getUserSettings(userId: number): Promise<IUserLanguages>;
  setUserSettings(userId: number, userSettings: IUserSettings): Promise<IUserLanguages>;
}
