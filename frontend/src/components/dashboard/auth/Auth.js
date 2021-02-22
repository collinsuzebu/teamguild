import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function RequireAuth({ component: Component, ...opts }) {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...opts}
      render={(props) =>
        user.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export { RequireAuth };
