export interface ICountUser {
    advisors: {
        total: number,
        active: number,
        inactive: number,
    };
    entrepreneurs: {
        total: number,
        active: number,
        inactive: number,
    };
}

export interface IUserCount {
    total: number;
    active: number;
    inactive: number;
}
