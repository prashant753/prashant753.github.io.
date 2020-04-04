export interface ILanguages {
    id: number;
    name: string;
    languageCode: string;
}

export interface IUserLanguagesResponse {
    primaryLanguage: ILanguages;
    secondaryLanguages: ILanguages[];
}

export interface IUserLanguages {
    languages: IUserLanguagesResponse;
}

export interface IUserSettings {
    userSettings: IUserLanguages;
}

export interface IAllLanguages {
    languages: ILanguages[];
}
