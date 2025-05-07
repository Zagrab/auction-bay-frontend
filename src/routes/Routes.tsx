import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login"   element={<LoginPage />}    />
    <Route path="/register" element={<RegisterPage />} />
  </Switch>
)

export default Routes