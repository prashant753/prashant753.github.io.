export interface IInviteData {
    id: number;
    status: string;
    errorCode: string | null;
}

export interface IBulkInvitation {
        results: IInviteData[];
}
