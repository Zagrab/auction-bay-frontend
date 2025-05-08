// src/routes/Routes.tsx
import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import LandingPage     from '../pages/LandingPage'
import LoginPage       from '../pages/LoginPage'
import RegisterPage    from '../pages/RegisterPage'
import MyAuctionsPage  from '../pages/MyAuctionsPage'
import RequireAuth     from '../components/RequireAuth'

const Routes: React.FC = () => (
  <Switch>
    {/* public */}
    <Route path="/"        element={<LandingPage />}   />
    <Route path="/login"   element={<LoginPage />}     />
    <Route path="/register" element={<RegisterPage />}  />

    {/* private */}
    <Route
      path="/my-auctions"
      element={
        <RequireAuth>
          <MyAuctionsPage />
        </RequireAuth>
      }
    />

  </Switch>
)

export default Routes
