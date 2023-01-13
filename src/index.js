import React from 'react';
import ReactDOM from 'react-dom/client';
import Main_Routers from './Main_Routers';
import reportWebVitals from './reportWebVitals';
import { combineReducers } from 'redux';
import Loginreducer from './Redux/Reducer/LoginReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Authreducer from './Redux/Reducer/AuthReducer';
import SearchReducer from "./Redux/Reducer/SearchReducer"
import ActiveBasketReducer from './Redux/Reducer/ActiveBasketReducer';
import BadgeReducer from './Redux/Reducer/BadgeReducer';
import { transitions, positions,types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { style } from '@mui/system';

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '10px',
    type: types.SUCCESS,
    transition: transitions.SCALE,
    containerStyle:{
        fontSize:"0.8rem",
    }
}

export const store = createStore(
    combineReducers(
        {
            search: SearchReducer,
            login: Loginreducer,
            auth: Authreducer,
            activeBasket: ActiveBasketReducer,
            badge: BadgeReducer
        }
    ));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <Main_Routers></Main_Routers>
            </AlertProvider>
        </Provider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
