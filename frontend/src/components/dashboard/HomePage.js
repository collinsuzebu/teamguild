import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Project } from "./contents/Project/Project";
import { TopNav } from "./TopNav/TopNav";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [user]);

  return (
    <div>
      <TopNav user={user} />
      <Project />
    </div>
  );
};

export { HomePage };
