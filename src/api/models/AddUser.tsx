export interface IUserAddModal {
    user: {
        email: string,
    };
}

export interface IAddUserReponse {
    user: {
        id: number;
        email: string;
        isVerified: boolean;
    };
}
