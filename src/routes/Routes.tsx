import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<LandingPage />} />
  </Switch>
)

export default Routes