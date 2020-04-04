export interface ISkills {
    id: number;
    name: string;
    skills: ISubGroup[];
}

export interface IIndustries {
    id: number;
    name: string;
    industries: ISubGroup[];
}

export interface ISubGroup {
    id: number;
    name: string;
}

export interface ISkillsReponse {
    skillGroups: ISkills[];
}

export interface IIndustriesResponse {
    industryGroups: IIndustries[];
}
