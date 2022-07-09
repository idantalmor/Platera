import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button2 from "@mui/material/Button";
import ModalNewChat from "./components/ModalNewChat";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { UserAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { set, ref, onValue, remove } from "firebase/database";
import SingleChat from "./components/SingleChat";
import { Spinner } from "react-bootstrap";

const HomeScreen = () => {
  const [chats, setChats] = useState([]);
  const { user, logout } = UserAuth();
  const [loading, setLoading] = useState(false);
  const uid = user.uid;
  const navigate = useNavigate();
  const email = user.email;

  //Add user to FireStore in firstTime
  const addToDatabase = async () => {
    await set(ref(db, `/users/${uid}`), {
      id: uid,
      email: user.email,
    });
  };
  //get all chat of this user
  useEffect(() => {
    getChatsFromUser();
  }, [chats]);

  const removeAll = () => {
    remove(ref(db, `/chats`));
  };

  const getChatsFromUser = async () => {
    setLoading(true)
    let tempArray = [];
    onValue(ref(db, `/chats`), (snapshot) => {
      const myData = snapshot.val();
      if (myData != null) {
        Object.values(myData).map((contact) => {
          const isFound = contact.members.some((element) => {
            if (element.id === uid) {
              return true;
            }
            return false;
          });
          if (isFound) {
            const newChat = {
              id: contact.id,
              dateCreated: contact.dateCreated,
              members: contact.members,
              name: contact.name,
            };
            // setChats((oldArray) => [...oldArray, newChat]);
            tempArray.push(newChat);
          }
        });
      }
      setLoading(false)
    });
    setChats(tempArray);
  };

  //Create new User in RealTime db if he is not exist
  useEffect(() => {
    onValue(ref(db, `/users/${uid}`), (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        addToDatabase();
      }
    });
  }, [user]);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Welcome, {user && email}</h1>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <Title name="MY CHATS" />
        <List>
          {chats?.map((chat) => (
            <>
              <ListItem key={chat.id}>
                <ListItemButton onClick={() => navigate(`/chat/${chat.id}`)}>
                  <SingleChat
                    id={chat.id}
                    dateCreated={chat.dateCreated}
                    name={chat.name}
                    members={chat.members}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ borderBottomWidth: 3 }} />
            </>
          ))}
        </List>
        <Button2
          onClick={() => handleLogout()}
          variant="contained"
          size={"large"}
        >
          Log out
        </Button2>
        <Button2 onClick={() => removeAll()} variant="contained" size={"large"}>
          remove
        </Button2>
        <ModalNewChat getChatFromUser={getChatsFromUser} />
      </div>
    </div>
  );
};

export default HomeScreen;
