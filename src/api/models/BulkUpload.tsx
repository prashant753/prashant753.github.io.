export interface ILoader {
    [email: string]: boolean;
}

export interface IAdvisorParsedProfile {
    name: string;
    email: string;
    location: string;
    phoneNumber: string;
    professionalSummary: string;
    yearsOfExperience: string;
    employmentHistory: string;
    educationQualification: string;
    certifications: string;
    professionalNetworks: string;
    photograph: string;
    ecosystems: string;
    growthDrivers: string;
    competencies: string;
    industries: string;
    enagagement: string;
    advisingCapacity: string;
    advisingCompanyName: string;
    advisingCompanyDetailsRoleInAdvisingCompany: string;
    advisingCompanyDetailsURL: string;
    advisingCompanyDetailsSummary: string;
}

export interface ITemplate {
    templateUrl: string;
}

export interface IEntrepreneurParsedProfile {
    name: string;
    email: string;
    phoneNumber: string;
    professionalSummary: string;
    photograph: string;
    ecosystems: string;
    growthDrivers: string;
    competencies: string;
    industries: string;
    companyName: string;
    designation: string;
    companyUrl: string;
    companySummary: string;
    companyLocation: string;
    numberOfEmployees: string;
    amount: string;
    marketFocus: string;
    customerSegmentFocus: string;
    vision: string;
}
