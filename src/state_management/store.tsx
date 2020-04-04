import { applyMiddleware, compose, createStore } from 'redux';
import {rootReducer} from './reducer';
import rootSaga from './saga';
import createSagaMiddleware from 'redux-saga';

const Store = () => {
    /* ------------- redux Configuration ------------- */
    const middleware = [];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    /* ------------- Applying Redux Devtool Extension ------------- */
    if (process.env.NODE_ENV === 'development') {
        (window as any).__REDUX_DEVTOOLS_EXTENSION__
        ? enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__())
        :  enhancers.push((f: any) => f);
    }

    const createAppropriateStore = createStore;

    const store = createAppropriateStore(
        rootReducer,
        compose(...enhancers));

    // kick off root saga
    sagaMiddleware.run(rootSaga);

    return store;
};

const store = Store();

export default store;
