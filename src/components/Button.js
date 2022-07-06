import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ButtonSizes({type, text, size }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <Button
        onClick={() =>
          type === "Register" ? navigate("/register") : (
            type === 'Back to Login' ? navigate('/login') : navigate('/home')
          )
        }
        variant="contained"
        size={size}
      >
        {text}
      </Button>
    </Box>
  );
}
