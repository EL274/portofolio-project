import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import { FinanceProvider } from './context/FinanceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyles />
    <App />
  </BrowserRouter>

);
root.render(
  <BrowserRouter>
  <FinanceProvider>
    <App/>
  </FinanceProvider>
  </BrowserRouter>
);

root.render(
  <BrowserRouter>
    <FinanceProvider>
      <ToastContainer />
      <App />
    </FinanceProvider>
  </BrowserRouter>
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <FinanceProvider>
        <App />
      </FinanceProvider>
    </AuthProvider>
  </BrowserRouter>
);
