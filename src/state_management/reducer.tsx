import { combineReducers } from 'redux';


const appReducer = combineReducers({});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
