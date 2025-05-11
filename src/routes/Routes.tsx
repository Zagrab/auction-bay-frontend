// src/routes/Routes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage    from '../pages/LandingPage'
import LoginPage      from '../pages/LoginPage'
import RegisterPage   from '../pages/RegisterPage'
import MyAuctionsPage from '../pages/MyAuctionsPage'
import RequireAuth    from '../components/RequireAuth'
import Navigation     from '../layouts/Navigation'

const AppRoutes: React.FC = () => (
  <Routes>
    {/* public */}
    <Route path="/"        element={<LandingPage />} />
    <Route path="/login"   element={<LoginPage />}   />
    <Route path="/register" element={<RegisterPage />} />

    {/* private with Navigation */}
    <Route
      element={
        <RequireAuth>
          <Navigation />
        </RequireAuth>
      }
    >
      <Route path="/my-auctions" element={<MyAuctionsPage />} />
    </Route>
  </Routes>
)

export default AppRoutes
