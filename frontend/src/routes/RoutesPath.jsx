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

export const RoutesPath = () => {
  return (
    <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </>
  )
}
