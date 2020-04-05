import { IIndustries, ISkills } from './Category';
import { ITimeZone } from './TimeZone';
import { IGrowthDriverGroup } from './GrowthDrivers';

export interface IProfile {
    profilePicUrlThumbnail: string;
    profilePicUrl: string;
    name: string;
    userId: number;
    entrepreneur?: IEntrepreneur;
    advisor?: IAdvisor;
    location: ILocation;
    connectionsCount: number;
    timezone: ITimeZone;
    isActive: boolean;
    private: {
        email: string;
    };
    createdBy: any;
    type: string;
}
export interface IUserListData {
    role: string;
    status: boolean;
    page: number;
    selectedCountries: string;
    selectedEcosystems?: string;
    selectedCities?: string;
}

export interface IParams {
    isActive: boolean;
    userId: number;
}

export interface IEntrepreneur {
    companyDetails: IEntrepreneurCompanyDetails;
    designation: string;
    professionalSummary: string;
    industryInformation: IIndustries[];
    growthDriverInformation: IGrowthDriverGroup[];
    skillInformation: ISkills[];
    ecosystem: IEcosystem;
    private: {
        phoneNumber: string;
        revenue: {
            amount: number;
            currency: string;
        },
    };
    tier: ITier;
    stage: IStage;
}

export interface ITierResponse {
    tiers: ITier[];
}

export interface ITier {
    id: number;
    name: string;
    ecosystemId: number;
    systemName: string;
}

export interface IConsultingLevelsResponse {
    consultingLevels: IConsultingLevel[];
}

export interface IConsultingLevel {
    id: number;
    name: string;
    systemName: string;
}

export interface IStagesResponse {
    stages: IStage[];
}

export interface IStage {
    id: number;
    name: string;
    description: string;
    isDefaultValue: boolean;
    tagId: number;
}

export interface IEcosystemResponse {
    ecosystems: IEcosystem[];
}

export interface IEngagementResponse {
    engagements: IEngagement[];
}

export interface IConsultingTypeResponse {
    consultingTypes: IConsultingType[];
}

export interface IEcosystem {
    id: number;
    name: string;
}

export interface IEngagement {
    id: number;
    name: string;
}

export interface IConsultingType {
    id: number;
    name: string;
}

export interface IAdvisor {
    designation: string;
    employmentHistory: string;
    professionalSummary: string;
    educationQualification: string;
    industryInformation: IIndustries[];
    growthDriverInformation: IGrowthDriverGroup[];
    certifications: string;
    yearsOfExperience: string;
    skillInformation: ISkills[];
    advisingCompanyDetails: IAdvisorCompanyDetails;
    professionalNetworks: string;
    ecosystems: IEcosystem[];
    engagements: IEngagement[];
    consultingType: IConsultingType;
    private: {
        phoneNumber: string;
    };
    consultingLevel: IConsultingLevel;
    stages: IStage[];
}

export interface IAdvisorCompanyDetails {
    designation: string;
    name: string;
    summary: string;
    roleInAdvisingCompany: string;
    location: ILocation;
    numberOfEmployees: number;
    marketFocus: string;
    url: string;
    customerSegmentFocus: string;
}

export interface IEntrepreneurCompanyDetails {
    public: IPublic;
    id: number;
    canEdit: boolean;
}

export interface IPublic {
    location: ILocation;
    employees: IEmployee[];
    designation: string;
    name: string;
    summary: string;
    roleInAdvisingCompany: string;
    numberOfEmployees: number;
    marketFocus: string;
    url: string;
    customerSegmentFocus: string;
}

export interface IEmployee {
    status: string;
    canEdit: boolean;
    invitedBy: string;
    name: string;
    email: string;
    designation: string;
}

export interface ILocation {
    city: {
        name: string;
        id: number;
        displayName: string;
    };
}

export interface IProfileResponse {
    profiles: IProfile[];
    total: number;
}
