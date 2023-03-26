import React from "react";
import {Route, BrowserRouter, Routes, redirect} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Header from "./components/Header";
import VerticalBar from "./components/VerticalBar";


function Router() {
	return <BrowserRouter>
		<Header/>
		<VerticalBar/>
		<Routes>
			<Route path="/" element={<Dashboard/>}/>
			<Route path="/dashboard/:id" element={<Dashboard/>}/>
		</Routes>
	</BrowserRouter>;

}

export default Router;
