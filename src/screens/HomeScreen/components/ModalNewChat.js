import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import { UserAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { uid } from "uid";
import { set, ref, onValue, get, getDatabase } from "firebase/database";
import ComposedTextField from "../../LoginScreen/components/ComposedTextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ getChatFromUser }) {
  const { user } = UserAuth();
  const email = user.email;
  const [nameChat, setNameChat] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => {
    setOpen(false);
    setMembers([{ id: user.uid, email: email }]);
    setNameChat("");
    getChatFromUser()
  };
  const [members, setMembers] = useState([{ id: user.uid, email: email }]);
  const [data, setData] = useState([]);
  const uuid = uid();

  const handleOpen = () => {
    setOpen(true);
  };

  //Add user to Member array, if exist the function will remove member
  const addToMember = (user) => {
    const newMember = { id: user.id, email: user.email };
    const isFound = members.some((element) => {
      if (element.id === user.id) {
        return true;
      }
      return false;
    });
    if (!isFound) {
      return setMembers((oldArray) => [...oldArray, newMember]);
    } else {
      const newMembers = members.filter((oldarray) => oldarray.id !== user.id);
      return setMembers(newMembers);
    }
  };

  const HandleNewChat = async () => {
    const current = new Date().toUTCString();
    console.log(current);
    try {
      await set(ref(db, `/chats/${uuid}`), {
        id: uuid,
        name: nameChat,
        members: members,
        dateCreated: current,
        admin: {adminId: user.uid, nameAdmin: user.email}
      });
    } catch (error) {
      setError("error");
    }
    handleClose();
  };

  useEffect(() => {
    setData([]);
    onValue(ref(db, `/users`), (snapshot) => {
      const myData = snapshot.val();
      if (myData != null) {
        Object.values(myData).map((contact) => {
          const user = { id: contact.id, email: contact.email };
          setData((oldArray) => [...oldArray, user]);
        });
      }
    });
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>Create New Chat</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Chat
          </Typography>
          <ComposedTextField
            text={"Enter Name Group"}
            value={nameChat}
            setValue={setNameChat}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Who to join the chat with?
          </Typography>
          {data?.map((user) => (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Checkbox
                  defaultChecked={false}
                  disabled={email === user.email}
                  color="success"
                  onClick={() => addToMember(user)}
                />
                <h3>{user.email.split('@')[0]}</h3>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <h3>Total Members: {members.length}</h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <div>
              <Button onClick={HandleNewChat}>Create Chat</Button>
              {error && <h3>{error}</h3>}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
