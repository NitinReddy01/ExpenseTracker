import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from './Context/UserProvider';
import { GlobalStyle } from './Styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>
      <GlobalStyle/>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
);
