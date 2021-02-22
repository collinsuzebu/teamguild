import React from "react";
import { Spinner } from "reactstrap";

export default function DSpinner() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
}
