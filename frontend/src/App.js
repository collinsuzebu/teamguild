import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RequireAuth } from "./components/dashboard/auth/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./components/dashboard/HomePage";
import { ManageProject } from "./components/dashboard/contents/Project/ManageProject";
import NotFound from "./components/dashboard/404/404";
import { LoginPage } from "./components/dashboard/auth/LoginPage";
import { getUser } from "./redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isAuthenticated) {
      // login on app load, if user has a valid cookie sesssion
      dispatch(getUser()).catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />

        <RequireAuth exact path="/dashboard" component={HomePage} />
        <RequireAuth exact path="/projects/:id" component={ManageProject} />
        <RequireAuth exact path="/project" component={ManageProject} />

        <Route component={NotFound} />
      </Switch>
      <ToastContainer autoClose={3500} hideProgressBar closeOnClick />
    </div>
  );
}

export default App;
