import React from "react";
import Button from "../../components/Button"

const ErrorScreen = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection:'column', alignItems:'center' }}>
      <div>
        <h5>Oops...</h5>
      </div>
      <div>
        <h5>Lost your way?</h5>
      </div>
      <Button type={"Back to Login"} text={"Back"} size={"small"} />
    </div>
  );
};

export default ErrorScreen;
