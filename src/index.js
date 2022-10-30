import React from 'react';
import ReactDOM from 'react-dom/client';
import Main_Routers from './Main_Routers';
import reportWebVitals from './reportWebVitals';
import { combineReducers } from 'redux';
import Loginreducer from './Redux/Reducer/LoginReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Authreducer from './Redux/Reducer/AuthReducer';

export const store = createStore(
    combineReducers(
        {
            login: Loginreducer,
            auth: Authreducer
        }
    ));






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Provider store={store}>
            <Main_Routers></Main_Routers>
        </Provider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
