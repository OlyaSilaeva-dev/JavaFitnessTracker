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
import AddToDayProgress from "../pages/products/AddToDayProgress";
import Workout from "../pages/workouts/Workout";
import NewWorkout from "../pages/workouts/NewWorkout";
import WorkoutInfo from "../pages/workouts/WorkoutInfo";
import Exercise from "../pages/workouts/exercises/Exercise";
import NewExercise from "../pages/workouts/exercises/NewExercise";
import ExerciseDetail from "../pages/workouts/exercises/ExerciseDetail";
import AddExerciseToWorkout from "../pages/workouts/exercises/AddExerciseToWorkout";
import UserInfo from "../user/userInfo";

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
                <Route path = "/pages/products" element = {<Product/>}/>
                <Route path = "/pages/products/new_product" element = {<NewProduct/>}/>
                <Route path = "/pages/products/:id" element = {<ProductDetail/>}/>
                <Route path = "/pages/products/add_to_dayprogress/:id" element = {<AddToDayProgress/>}/>
                <Route path = "/pages/workouts" element = {<Workout/>}/>
                <Route path = "/pages/workouts/new_workout" element={<NewWorkout/>}/>
                <Route path = "/pages/workouts/:id" element={<WorkoutInfo/>}/>
                <Route path = "/pages/workouts/:id/exercises" element={<Exercise/>}/>
                <Route path = "/pages/workouts/:id/exercises/new_exercise" element={<NewExercise/>}/>
                <Route path = "/pages/workouts/:workoutId/exercises/:exerciseId" element={<ExerciseDetail/>}/>
                <Route path = "/pages/workouts/:workoutId/exercises/add_to_workout/:exerciseId" element={<AddExerciseToWorkout/>}/>
                <Route path = "/user/userInfo" element={<UserInfo/>}/>
              </Routes>
            </BrowserRouter>
          </main>
        </>
    )
  }
}

export default App;
