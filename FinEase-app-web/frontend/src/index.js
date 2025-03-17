import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FinanceProvider } from './context/FinanceContext';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/GlobalStyles';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider> {/* Contexte d'authentification */}
      <FinanceProvider> {/* Contexte de finance */}
        <GlobalStyles /> {/* Styles globaux */}
        <ToastContainer /> {/* Notifications */}
        <App /> {/* L'application principale */}
      </FinanceProvider>
    </AuthProvider>
  </BrowserRouter>
);
