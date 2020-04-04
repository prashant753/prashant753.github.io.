import { IApiClientErrorDetails } from '../../network/apiClientError';

export interface IError {
    status: string;
    data: {
        error: {
            code: string,
            message: string,
            description: string,
        },
    };
}

interface IDetails {
    details: IApiClientErrorDetails;
}

export interface IBulkUploadError {
    [email: string]: IDetails;
}
