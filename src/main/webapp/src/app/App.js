import Login from "../auth/login/Login"
import HelloPage from "../start_page/HelloPage";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import PrivateRoute from "../router/PrivateRoute";
import AdminPanel from "../admin/AdminPanel";
import Register from "../auth/register/Register";

class App extends React.Component {

  getUser() {
    return localStorage.getItem("user");
  }

  render () {
    return (
        <>
          <main className="mb-5">
            <BrowserRouter>
              <Routes>
                <Route path = "/register" element = {<Register/>}/>
                <Route path = "/login" element = {<Login/>}/>
                <Route path = "/hello-page" element = {<PrivateRoute><HelloPage user = {this.getUser() ? this.getUser() : "unknown"} /></PrivateRoute>}/>
                <Route path = "*" element = {<Navigate to="/login"/>}/>
                <Route path = "/admin/panel" element = {<AdminPanel/>}/>
              </Routes>
            </BrowserRouter>
          </main>
        </>
    )
  }
}

export default App;
