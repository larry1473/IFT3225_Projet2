import React from 'react';
import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { LoginStatusProvider } from './context/LoginStatusContext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <DarkModeProvider>
      <LoginStatusProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
        </QueryClientProvider>
      </LoginStatusProvider>
    </DarkModeProvider>
  );
}
