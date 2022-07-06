import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Button from "../../components/Button";
import ComposedTextField from "../LoginScreen/components/ComposedTextField";
import Button2 from "@mui/material/Button";
import { UserAuth } from "../../contexts/AuthContext";


const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [uniqueId, setUniqueId] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email || !password || !validPassword) {
      return setError("Empty Field Error");
    }
    if (password != validPassword) {
      return setError("The password are not equal");
    }
    if (password.length < 6) {
      return setError("The password must be longer than 6 letters");
    }
    try {
      await createUser(email, password)
      navigate("/login");
    } catch (error) {
      setError("Please Check Again");
    }
  };

  return (
    <>
      <Card>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Title name="REGISTER" />
            <ComposedTextField
              text={"Enter Mail"}
              type={"Email"}
              value={email}
              setValue={setEmail}
            />
            <ComposedTextField
              text={"Enter Password"}
              type={"password"}
              value={password}
              setValue={setPassword}
            />
            <ComposedTextField
              text={"Password Confirmation"}
              type={"password"}
              value={validPassword}
              setValue={setValidPassword}
            />
            <Button2
              onClick={() => handleSubmit()}
              variant="contained"
              size={"large"}
            >
              Sign up Now!
            </Button2>
            {error && <h2>{error}</h2>}
            {/* <Button type={"Back to Login"} text={"Register"} size={"large"} onClick={'Register'} /> */}
          </div>
        </div>
      </Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        <Button type={"Back to Login"} text={"Back to Login"} size={"small"} />
      </div>
    </>
  );
};

export default RegisterScreen;
