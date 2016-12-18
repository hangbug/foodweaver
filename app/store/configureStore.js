/**
 * Created by HANG on 10/14/2016.
 */
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';

const configureStore = initialState => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk),);
    return store;
};

export default configureStore;