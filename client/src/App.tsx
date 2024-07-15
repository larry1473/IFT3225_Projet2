import React from 'react';
import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { LoginStatusProvider } from './context/LoginStatusContext';

export default function App() {
  return (
    <DarkModeProvider>
      <LoginStatusProvider>
        <Header />
        <Outlet />
      </LoginStatusProvider>
    </DarkModeProvider>
  );
}
