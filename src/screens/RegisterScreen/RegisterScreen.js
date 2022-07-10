import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Button from "../../components/Button";
import ComposedTextField from "../LoginScreen/components/ComposedTextField";
import Button2 from "@mui/material/Button";
import { Spinner } from "react-bootstrap";
import { UserAuth } from "../../contexts/AuthContext";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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
      await createUser(email, password);
      navigate("/login");
    } catch (error) {
      setError("Please Check Again");
    }
    setLoading(false);
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
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div style={{marginBottom:'10%'}}>
            <Button2
              onClick={() => handleSubmit()}
              variant="contained"
              size={"large"}
            >
              Sign up Now!
            </Button2>
              </div>
              <div>
            {/* <Button2
              onClick={() => console.log('gmail')}
              variant="contained"
              size={"large"}
            >
              <GoogleIcon/> | Sign in with Google 
            </Button2> */}


              </div>
            </div>
            {loading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
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
