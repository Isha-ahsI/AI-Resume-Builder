import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from "../pages/Home";
import { Layout } from "../layout/Layout";
import { Templates } from "../pages/Templates";
import { NotFound } from '../pages/NotFound';
import { ResetPassword } from '../pages/ResetPassword';
import { ForgotPassword } from '../pages/ForgotPassword';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';
import { SetupWizard } from '../pages/SetupWizard';
import { Builder } from "../pages/Builder";

export const RoutesPath = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/setup-wizard" element={<SetupWizard />} />
          <Route path="/builder" element={<Builder />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}
