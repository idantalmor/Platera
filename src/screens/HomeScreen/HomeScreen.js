import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button2 from "@mui/material/Button";
import ModalNewChat from "./components/ModalNewChat";
import SingleChat from "./components/SingleChat";
import { UserAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { set, ref, onValue } from "firebase/database";

const HomeScreen = () => {
  const [chats, setChats] = useState([]);
  const { user, logout } = UserAuth();
  const uid = user.uid;

  const addToDatabase = async () => {
    await set(ref(db, `/users/${uid}`), {
      id: uid,
      email: user.email,
    });
  };

  //get all chat of this user
  useEffect(() => {
    setChats([]);
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
            setChats((oldArray) => [...oldArray, newChat]);
          }
        });
      }
    });
  }, []);


  //Create new User in RealTime db if he is not exist
  useEffect(() => {
    onValue(ref(db, `/users/${uid}`), (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        addToDatabase();
      }
    });
  }, [user]);

  const navigate = useNavigate();
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
        <Title name="MY CHATS" />
        <h1>Welcome {user && user.email}</h1>
        {chats?.map((chat) => (
          <div>
            <SingleChat
              id={chat.id}
              dateCreated={chat.dateCreated}
              name={chat.name}
              members={chat.members}
            />
          </div>
        ))}
        <Button2
          onClick={() => handleLogout()}
          variant="contained"
          size={"large"}
        >
          Log out
        </Button2>
        <ModalNewChat />
      </div>
    </div>
  );
};

export default HomeScreen;
