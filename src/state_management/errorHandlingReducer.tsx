import { Logger } from '../utils/Logger';
import { IApiClientErrorDetails } from '../network/apiClientError';

export const REQUEST_FAILED_ERROR = 'REQUEST_FAILED_ERROR';
export const CLEAR_REQUEST_FAILED_ERROR = 'CLEAR_REQUEST_FAILED_ERROR';

interface IAction {
  type: string;
  payload: IApiClientErrorDetails;
}

interface IErrorState {
  error: IApiClientErrorDetails | null;
}

const initialState: IErrorState = {
  error: null,
};

export default function errorHandlingReducer(state = initialState, action: IAction) {
  Logger.debug('[errorHandlingReducer] error', action);
  switch (action.type) {
    default:
      return state;
  }
}
