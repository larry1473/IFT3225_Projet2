import React from 'react';
import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';

export default function App() {
  return (
    <DarkModeProvider>
      <Header />
      <Outlet />
    </DarkModeProvider>
  );
}
