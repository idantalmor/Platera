import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Button2 from "@mui/material/Button";
import ComposedTextField from "./components/ComposedTextField";
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from "../../contexts/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {signIn} = UserAuth();
  const handleSignIn = async () =>{
      setError('')
      try {
        if(!email || !password){
          return setError("Empty Field Error");
        }
        await signIn(email,password)
        navigate('/home')
      } catch (error) {
        setError("Please Check Again");
        
      }
  }

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
          <ComposedTextField text={"Password"} type={"password"} value={password}
          setValue={setPassword} />
              {error && <h2>{error}</h2>}
           <Button2
              onClick={() => handleSignIn()}
              variant="contained"
              size={"large"}
            >
              Sign in!
            </Button2>
          <Button type={"Register"} text={"Sign up Now!"} size={"small"} />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
