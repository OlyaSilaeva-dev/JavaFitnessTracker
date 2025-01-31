import Login from "../auth/login/Login"
import HelloPage from "../start_page/HelloPage";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import PrivateRoute from "../router/PrivateRoute";
import AdminPanel from "../admin/AdminPanel";
import Register from "../auth/register/Register";
import Product from "../pages/products/Product";
import NewProduct from "../pages/products/NewProduct";
import ProductDetail from "../pages/products/ProductDetail";

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
                <Route path = "/pages/products" element = {<Product/>}/>
                <Route path = "/hello-page" element = {<PrivateRoute><HelloPage user = {this.getUser() ? this.getUser() : "unknown"} /></PrivateRoute>}/>
                <Route path = "*" element = {<Navigate to="/login"/>}/>
                <Route path = "/admin/panel" element = {<AdminPanel/>}/>
                <Route path = "/pages/products/new_product" element = {<NewProduct/>}/>
                <Route path = "/pages/products/:id" element = {<ProductDetail/>}/>
              </Routes>
            </BrowserRouter>
          </main>
        </>
    )
  }
}

export default App;
