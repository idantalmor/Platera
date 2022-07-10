import React from "react";
import Box from "@mui/material/Box";
import { UserAuth } from "../../../contexts/AuthContext";

const MessageBox = ({ text, whoSend, createdAt }) => {
  const { user, logout } = UserAuth();
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
            <h5 style={{ fontSize: "14px", color: "black" }}></h5>
            <Box
              sx={{
                width: lengthMessage > 8 ? lengthMessage * 10 : 100,
                height: 70,
                backgroundColor: "white",
                marginBottom: 5,
                borderRadius: 10,
                marginLeft: "80%",
              }}
            >
              <div style={{ padding: "10%" }}>
                <div
                  style={{
                    display: "flex",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                  }}
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
                </div>
              </div>
            </Box>
          </>
        )}
      </div>
    </>
  );
  // <header>
  //   <div style={{display:'flex', marginTop:'7%'}}>
  //     <img src={ChatBubbleCurrentUser} height="120" width="180" />
  //     <div style={{ float: "10%",  marginTop: '4%', marginLeft:'1%'}}>
  //       <h5 style={{fontSize:'16px', color:'black'}}> {text} </h5>
  //     </div>
  //     <div style={{ float: "10%",  marginTop: '12%', marginLeft:'1%'}}>
  //       <h5 style={{fontSize:'16px', border: '1px solid white', padding: 10, borderRadius:10, color:'black'}}> {user} </h5>
  //     </div>
  //     <div style={{ float: "10%", marginTop: '6%', marginLeft:'12%'}}>
  //       <h5 style={{fontSize:'10px', border: '1px solid black', padding: 4, borderRadius:10, color:'black'}}> {createdAt} </h5>
  //     </div>
  //   </div>
  // </header>

  //   <img>
  //   <img  src={ChatBubbleCurrentUser} height="100" width="150">

  //   </img>
  //   <div>
  //    {text}
  //   </div>
  //   <div>
  //   {user}
  //  </div>
  //  <div>
  //   {createdAt}
  //  </div>
  //   </>
};

export default MessageBox;
