import React from 'react';
import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { LoginStatusProvider } from './context/LoginStatusContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ProjectProvider } from './context/ProjectsContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <DarkModeProvider>
      <LoginStatusProvider>
        <ProjectProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <Outlet />
          </QueryClientProvider>
        </ProjectProvider>
      </LoginStatusProvider>
    </DarkModeProvider>
  );
}
