import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter,Routes, Route } from "react-router";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css'
import App from './App.jsx'
import MainLayout from "./layouts/main.layout";
import Homepage from './pages/home.page'
import NoteUpdatePage from './pages/NoteUpdatePage.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Pricing from './pages/Pricing.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import { store } from './lib/api/store';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY env var. Auth will not work.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/how-it-works" element={
                  <ProtectedRoute><HowItWorks /></ProtectedRoute>
                } />
                <Route path="/upload" element={
                  <ProtectedRoute><NoteUpdatePage/></ProtectedRoute>
                } />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
)
