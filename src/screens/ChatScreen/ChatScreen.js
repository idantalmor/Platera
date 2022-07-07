import React, { useEffect, useState } from "react";
import Button2 from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import DetailsChat from "./components/DetailsChat";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleChat from "./TitleChat";
import { Card } from "react-bootstrap";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, onValue, get, getDatabase } from "firebase/database";
import SendIcon from "@mui/icons-material/Send";

const ChatScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const chatId = params.id;
  const [currentChat, setCurrentChat] = useState({});

  useEffect(() => {
    getCurrentChat();
  }, []);

  const getCurrentChat = () => {
    onValue(ref(db, `/chats/${chatId}`), (snapshot) => {
      const myData = snapshot.val();
      setCurrentChat({
        id: chatId,
        name: myData.name,
        members: myData.members,
        dateCreated: myData.dateCreated.substring(0, 16),
        admin: {
          adminId: myData.admin.adminId,
          nameAdmin: myData.admin.nameAdmin,
        },
      });
    });
  };

  return (
    <>
      <div>
        <Card>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DetailsChat
              name={currentChat.name}
              members={currentChat.members}
            />
          </div>
        </Card>
        <Box>
          <div
            style={{
              height: "500px",
              backgroundImage: "linear-gradient(to right, #BABABA, #F3F3F3)",
              overflow: "hidden",
              overflowY: "scroll",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TitleChat admin={currentChat.admin} dateCreated={currentChat.dateCreated}/>
            </div>
          </div>
        </Box>
        <Card>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField fullWidth label="enter a Message" id="fullWidth" />
              <div
                style={{
                  display: "flex",
                  marginLeft: "2%",
                  alignItems: "center",
                }}
              >
                <SendIcon
                  fontSize="large"
                  color={"primary"}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: 2,
                  }}
                />
              </div>
            </div>
          </Box>
        </Card>
      </div>
      <Button2
        onClick={() => navigate("/home")}
        variant="contained"
        size={"large"}
      >
        back
      </Button2>
    </>
  );
};

export default ChatScreen;
