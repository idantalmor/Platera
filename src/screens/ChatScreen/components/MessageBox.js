import React from "react";
import Box from "@mui/material/Box";
import { UserAuth } from "../../../contexts/AuthContext";

const MessageBox = ({ text, whoSend, createdAt }) => {
  const { user} = UserAuth();
  const currentUserId = user.uid;
  const lengthMessage = text.length;
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "2%" }}>
        {whoSend.id === currentUserId ? (
          <>
            <Box
              sx={{
                width: lengthMessage > 8 ? lengthMessage * 10 : 100,
                height: 50,
                backgroundColor: "#80ffaa",
                marginBottom: 5,
                borderRadius: 30,
              }}
            >
              <div style={{ padding: "3%", marginTop:'5%', marginLeft:'5%' }}>
                <div>
                  <h5 style={{ fontSize: "12px", color: "black" }}> {text} </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                </div>
              </div>
            </Box>
                  <h5
                    style={{
                      fontSize: "10px",
                      border: "1px solid black",
                      padding: 4,
                      borderRadius: 10,
                      color: "black",
                    }}
                  >
                    {" "}
                    {createdAt}{" "}
                  </h5>
          </>
        ) : (
          <>
          <div style={lengthMessage > 18 ? {display:'flex', marginLeft:'20%', alignItems:'center'} : {display:'flex', marginLeft:'60%', alignItems:'center'}}>
                <h5
                      style={{
                        fontSize: "10px",
                        border: "1px solid black",
                        padding: 4,
                        borderRadius: 10,
                        color: "black",
                        height: 20,
                      }}
                    >
                      {" "}
                      {createdAt}{" "}
                    </h5>
            <Box
              sx={{
                width: lengthMessage > 8 ? lengthMessage * 10 : 100,
                height: 50,
                backgroundColor: 'white',
                marginBottom: 5,
                borderRadius: 30,
              }}
            >
              <div style={{ padding: "5%", display:'flex' }}>
                <div
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: "8px", color: "red" }}>
                      {whoSend.name}
                    </h3>
                    <h5 style={{ fontSize: "12px", color: "black" }}>
                      {" "}
                      {text}{" "}
                    </h5>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                
                </div>
              </div>
            </Box>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default MessageBox;
