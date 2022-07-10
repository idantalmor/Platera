import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Button2 from "@mui/material/Button";
import ComposedTextField from "./components/ComposedTextField";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../contexts/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, signIn, googleSignIn, facebookSignIn } = UserAuth();
  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      if (!email || !password) {
        return setError("Empty Field Error");
      }
      await signIn(email, password);
      navigate("/home");
    } catch (error) {
      setError("Please Check Again");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Title name="LOGIN" />
          <ComposedTextField
            text={"Email"}
            type={"Email"}
            value={email}
            setValue={setEmail}
          />
          <ComposedTextField
            text={"Password"}
            type={"password"}
            value={password}
            setValue={setPassword}
          />
          {error && <h2>{error}</h2>}
          <div
            style={{
              marginBottom: "1%",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button2
              onClick={() => handleSignIn()}
              variant="contained"
              size={"large"}
            >
              Sign in!
            </Button2>
            <h2>--- or ---</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: 2 }}>
            <div style={{ marginBottom: "5%" }}>
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>
            <Button2
              variant="contained"
              size={"large"}
              onClick={handleFacebookSignIn}
            >
              <div style={{ display: "flex" }}>
                <FacebookIcon />

                <div>Sign in with Facebook</div>
              </div>
            </Button2>
          </div>

          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          <Button type={"Register"} text={"Sign up Now!"} size={"small"} />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
