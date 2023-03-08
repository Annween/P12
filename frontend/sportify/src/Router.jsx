import React from "react";
import { Route, BrowserRouter,  Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Header from "./components/Header";

function Router() {
  return <BrowserRouter>
  <Header/>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
      </Routes>
   </BrowserRouter>;

}

export default Router;
