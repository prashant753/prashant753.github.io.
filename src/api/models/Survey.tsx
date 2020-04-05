export interface ISurveyResponse {
    response: IResponse[];
}

export interface IResponse {
    questionnaireId: string;
    respondentId: string;
    responses: IResponses[];
    _id: string;
}

export interface IResponses {
    questionId: string;
    updatedAt: string;
    responseValue: IResponseValue;
}

export interface IResponseValue {
    singleSelect: ISingleSelect;
    revenue: IRevenue;
}

export interface ISingleSelect {
    value: string;
    option: string;
    localisationKer: string;
}

export interface IRevenue {
    currency: string;
    amount: string;
}

export interface IQuestionsResponse {
    questions: IQuestions[];
}

export interface IQuestions {
    id: string;
    questionText: string;
    type: string;
}
