import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import storeModule from './Shopping/Redux/Store';

import { persistor } from './Shopping/Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = storeModule.store;
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate  persistor={persistor}>
     <GoogleOAuthProvider clientId="893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com">
     
     <App />
     
      </GoogleOAuthProvider>
      </PersistGate>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
