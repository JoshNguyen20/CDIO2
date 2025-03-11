import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>  {/* Bọc App bên trong Provider */}
        <App />
    </Provider>
);

reportWebVitals();
