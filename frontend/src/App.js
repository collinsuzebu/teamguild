import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { RequireAuth } from "./components/dashboard/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./components/dashboard/HomePage";
import { ManageProject } from "./components/dashboard/contents/Project/ManageProject";
import NotFound from "./components/dashboard/404/404";
import { LoginPage } from "./components/dashboard/auth/LoginPage";
import { getUser } from "./redux/actions/auth";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

import "./App.scss";

const cookies = new Cookies();

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser()).catch((err) => console.log(err));

    const lastVisited = localStorage.getItem("current");

    if (cookies.get("is_authenticated") && lastVisited) {
      history.push(lastVisited);
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
