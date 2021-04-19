import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Spinner } from "reactstrap";
import { BACKEND_SERVER } from "../../../../src/config";

import "./LoginPage.scss";

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
    window.location.assign(`${BACKEND_SERVER}/`);
  };

  return (
    <Container>
      <Row className="align-items-center" style={{ padding: "50px 0" }}>
        <Col sm="12" md="12" lg="7" xl="7">
          <div class="brand">
            <a href="/" class="logo">
              TG <span>.</span>
            </a>

            <div class="heading">
              <h2>TEAMGUILD</h2>
              <p>Your right choice</p>
            </div>
          </div>
        </Col>
        <Col sm={{ size: "auto", offset: 1 }}>
          <div className={"text-center"}>
            <Button disabled={loading} onClick={handleClick}>
              <i className="fa fa-github"></i> LOGIN WITH GITHUB{" "}
              {loading ? <Spinner size="sm" color="secondary" /> : null}
            </Button>
            <p className={"text-muted"}>
              Authorization with github is required.
            </p>
          </div>
        </Col>
      </Row>
      <footer>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a href="http://collinsuzebu.com" target="_blank">
            Collins Uzebu
          </a>
        </p>
      </footer>
    </Container>
  );
}
export { LoginPage };
