import { ICity } from '../api/models/City';
import { ITimeZone } from '../api/models/TimeZone';
import { ISkills, IIndustries, ISubGroup } from '../api/models/Category';
import {
    IEcosystem,
    IEngagement,
    IProfile,
    IAdvisor,
    IEntrepreneur,
    ITier,
    IConsultingLevel,
} from '../api/models/Profile';
import { IGrowthDriverGroup, IGrowthDriver } from '../api/models/GrowthDrivers';
import { ILanguages } from '../api/models/Languages';

interface IProfileData {
    name: string;
    designation: string;
    userlocation: ICity;
    timeZones: ITimeZone;
    companyLocation?: ICity;
    shortBio?: string;
    qualification?: string;
    certifications?: string;
    professionlNetworks?: string;
    yearsOfExperience?: string;
    employmentHistory?: string;
    companyName: string;
    companySummary: string;
    companyUrl: string;
    imageName: string;
    skillInformation: ISkills[];
    selectedSkillIds: number[];
    selectedIndustryIds: number[];
    industryInformation: IIndustries[];
    numberOfEmployee?: string;
    amount?: string;
    selectedEcosystem: IEcosystem[];
    selectedEngagement?: IEngagement[];
    selectedCurrency: string;
    selectedStages: any;
    selectedTier: ITier;
    selectedConsultingLevel: IConsultingLevel;
}

export const profileMapper = (data: IProfile, primaryLanguage: ILanguages, secondaryLanguages: ILanguages[]) => {
    let profile: any;
    profile = {
        name: data.name,
        userlocation: data.location.city,
        timeZones: data.timezone,
        imageName: data.profilePicUrlThumbnail,
        primaryLanguage,
        secondaryLanguages,
    };
    if ('advisor' in data) {
        profile = data.advisor && advisorProfile(profile, data.advisor);
    } else {
        profile = data.entrepreneur && entrepreneurProfile(profile, data.entrepreneur);
    }
    return profile;
};

const advisorProfile = (profile: IProfileData, data: IAdvisor) => {
    const selectedSkillIds = getSelectedSKillIds(data.skillInformation);
    const selectedIndustryIds = getSelectedIndustryIds(data.industryInformation);
    const selectedGrowthDriversIds = getSelectedGrowthDriverIds(data.growthDriverInformation);
    return {
        ...profile,
        designation: data.advisingCompanyDetails.roleInAdvisingCompany || '',
        shortBio: data.professionalSummary || '',
        qualification: data.educationQualification || '',
        certifications: data.certifications || '',
        professionalNetworks: data.professionalNetworks || '',
        yearsOfExperience: data.yearsOfExperience || '',
        employmentHistory: data.employmentHistory || '',
        companyName: data.advisingCompanyDetails.name || '',
        companySummary: data.advisingCompanyDetails.summary || '',
        companyUrl: data.advisingCompanyDetails.url || '',
        skillInformation: data.skillInformation,
        selectedSkillIds,
        industryInformation: data.industryInformation,
        selectedIndustryIds,
        selectedGrowthDriversIds,
        selectedStages: data.ecosystems.find((ecosystem: any) => ecosystem.id === 1) && data.stages,
        growthDriverInfo: data.growthDriverInformation,
        selectedEcosystem: data.ecosystems || [],
        selectedEngagement: data.engagements || [],
        selectedConsultingType: data.consultingType || {},
        selectedConsultingLevel: data.consultingLevel || {},
    };
};

const entrepreneurProfile = (profile: IProfileData, data: IEntrepreneur) => {
    const selectedSkillIds = getSelectedSKillIds(data.skillInformation);
    const selectedIndustryIds = getSelectedIndustryIds(data.industryInformation);
    const selectedGrowthDriversIds = getSelectedGrowthDriverIds(data.growthDriverInformation);
    return {
        ...profile,
        designation: data.companyDetails.public.designation || '',
        shortBio: data.professionalSummary || '',
        companyName: data.companyDetails.public.name || '',
        companySummary: data.companyDetails.public.summary || '',
        companyUrl: data.companyDetails.public.url,
        amount: (data.private.revenue.amount).toString(),
        skillInformation: data.skillInformation,
        selectedSkillIds,
        industryInformation: data.industryInformation,
        selectedIndustryIds,
        selectedGrowthDriversIds,
        growthDriverInfo: data.growthDriverInformation,
        selectedEcosystem: [data.ecosystem],
        selectedTier: data.tier,
        selectedStages: data.ecosystem.id === 1 && data.stage,
        numberOfEmployee: data.companyDetails.public.numberOfEmployees.toString(),
        companyLocation: data.companyDetails.public.location && data.companyDetails.public.location.city || {} as ICity,
    };
};

const getSelectedSKillIds = (skillInformation: ISkills[]) => {
    const selectedSkillIds: number[] = [];
    if (skillInformation) {
        skillInformation.forEach((skills: ISkills) =>
            skills.skills.forEach((skill: ISubGroup) => selectedSkillIds.push(skill.id)));
    }
    return selectedSkillIds;
};

const getSelectedGrowthDriverIds = (growthDrivers: IGrowthDriverGroup[]) => {
    const selectedGrowthDriversIds: number[] = [];
    if (growthDrivers) {
        growthDrivers.forEach((data: IGrowthDriverGroup) =>
            data.growthDrivers.forEach((growthDriver: IGrowthDriver) =>
                selectedGrowthDriversIds.push(growthDriver.id)));
    }
    return selectedGrowthDriversIds;
};

const getSelectedIndustryIds = (industryInformation: IIndustries[]) => {
    const selectedIndustryIds: number[] = [];
    if (industryInformation) {
        industryInformation.forEach((industries: IIndustries) =>
            industries.industries.forEach((industry: ISubGroup) => selectedIndustryIds.push(industry.id)));
    }
    return selectedIndustryIds;
};
