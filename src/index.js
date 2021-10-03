import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ActiveTabProvider } from 'components/ActiveTabContext/ActiveTabContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ActiveTabProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ActiveTabProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
