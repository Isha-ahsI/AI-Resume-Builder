import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from "../pages/Home";
import { Layout } from "../layout/Layout";
import { Templates } from "../pages/Templates";

export const RoutesPath = () => {
  return (
    <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
          </Route>
        </Routes>
    </>
  )
}
