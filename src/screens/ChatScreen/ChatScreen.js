import React, { useEffect, useState } from "react";
import Button2 from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import DetailsChat from "./components/DetailsChat";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleChat from "./TitleChat";
import MessageBox from "./components/MessageBox";
import { Card } from "react-bootstrap";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, onValue, get, getDatabase, update } from "firebase/database";
import SendIcon from "@mui/icons-material/Send";
import ComposedTextField from "../LoginScreen/components/ComposedTextField";
import { UserAuth } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const ChatScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const chatId = params.id;
  const { user } = UserAuth();
  const [currentChat, setCurrentChat] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [numberMessages, setNumberMessages] = useState(0);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [firstReloadCheck, setFirstReloadCheck] = useState(false);
  const [checkNewMessage, setCheckNewMessage] = useState(false);

  useEffect(() => {
    getCurrentChat();
  }, [user]);

  //Get the details of this chat
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
        messages: myData.messages,
      });
    });
  };

  useEffect(() => {
    if (refresh) {
      ReadAllMessages();
    }
  }, [allMessages, refresh]);

  useEffect(() => {
    setNumberMessages(allMessages.length);
  });

  useEffect(() => {
    setRefresh(true);
  }, [numberMessages]);

  const ReadAllMessages = () => {
    let tempArray = [];
    setAllMessages("");
    onValue(ref(db, `/chats/${chatId}/messages`), (snapshot) => {
      const myData = snapshot.val();
      if (myData != null) {
        Object.values(myData).map((contact) => {
          const message = contact;
          tempArray.push(message);
        });
      }
    });
    setAllMessages(tempArray);
    setRefresh(false);
  };

  const addToDataBase = async () => {
    try {
      await set(ref(db, `/chats/${chatId}`), {
        id: currentChat.id,
        name: currentChat.name,
        members: currentChat.members,
        dateCreated: currentChat.dateCreated.substring(0, 16),
        admin: {
          adminId: currentChat.admin.adminId,
          nameAdmin: currentChat.admin.nameAdmin,
        },
        messages: allMessages,
      });
    } catch (error) {
      console.log("error");
    }
    setCheckNewMessage(false);
  };

  useEffect(() => {
    if (checkNewMessage) {
      addToDataBase();
    }
  }, [allMessages, checkNewMessage]);

  const handleUpdateNewMessage = () => {
    setCheckNewMessage(false);
    const uuid = uid();
    let today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const newMessage = {
      id: uuid,
      user: { id: user.uid, name: user.email ? user.email : user.displayName },
      content: message,
      createdAt: time,
    };
    setAllMessages([...allMessages, newMessage]);
    setMessage("");
    setCheckNewMessage(true);
  };

  return (
    <>
      <div>
        <Card style={{border: '1px solid black'}}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DetailsChat
              name={currentChat.name}
              members={currentChat.members}
            />
          </div>
        </Card>
        {refresh && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <Box>
          <div
            style={{
              height: "500px",
              backgroundImage: "linear-gradient(to right, #BABABA, #F3F3F3)",
              overflow: "hidden",
              overflowY: "scroll",
              flexDirection: "column",
              border: '1px solid black'
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TitleChat
                admin={currentChat.admin}
                dateCreated={currentChat.dateCreated}
              />
            </div>
            {allMessages.map((message) => (
              <div key={message.id}>
                <MessageBox
                  text={message.content}
                  whoSend={message.user}
                  createdAt={message.createdAt}
                />
              </div>
            ))}
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
              {/* <TextField fullWidth label="enter a Message" id="fullWidth" /> */}
              <ComposedTextField
                text={"Enter new Message"}
                type={"Email"}
                value={message}
                setValue={setMessage}
                style={"chat"}
              />
              {message.length > 0 && (
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
                      cursor: "pointer",
                    }}
                    onClick={handleUpdateNewMessage}
                  />
                </div>
              )}
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
