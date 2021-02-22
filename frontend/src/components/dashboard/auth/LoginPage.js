import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { BACKEND_SERVER } from "../../../../src/config";

function LoginPage() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [user]);

  const handleClick = () => {
    setLoading(true);
    window.location.assign(BACKEND_SERVER);
  };

  return (
    <Container>
      <div className="jumbotron text-center text-primary">
        <h1>
          <span className="fa fa-github"></span> GITHUB OAUTH LOGIN
        </h1>
        <p>Authorization with github is required</p>

        <Button active={loading} onClick={handleClick}>
          <i className="fa fa-github"></i> LOGIN WITH GITHUB
        </Button>
      </div>
    </Container>
  );
}
export { LoginPage };
