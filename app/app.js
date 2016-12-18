/**
 * Created by HANG on 10/12/2016.
 */
import React from 'react';
import configureStore from './store/configureStore'
import { Router,browserHistory} from 'react-router';
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './routes';
import {Provider} from 'react-redux';
import {setCurrentUser} from './actions/setCurrentUser';
import {updateLikeIcon} from'./actions/updateLikeIcon';

const defaultState = window.__INITIAL_STATE__;
const store=configureStore(defaultState);

const history=syncHistoryWithStore(browserHistory,store);

if(localStorage.token){
    store.dispatch(setCurrentUser(localStorage.token));
}

store.dispatch(updateLikeIcon());

const router = (
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
);
render(router,document.getElementById('root'));