import { display } from "@mui/system";
import React from "react";
import { UserAuth } from "../../contexts/AuthContext";

const TitleChat = ({ admin, dateCreated }) => {
  const { user } = UserAuth();
  const uid = user.uid;
  return (
    <>
    <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
      <div
        style={{
          marginTop:'5%',
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "5px",
          padding: 2,
          justifyContent:'center',
          display:'flex'
        }}
      >
        <h6>{dateCreated}</h6>
      </div>
      <div>
        {uid === admin?.adminId ? <h5>You open the group</h5> : <h5>{admin?.nameAdmin} Added you</h5>}
      </div>
    </div>
    </>
  );
};

export default TitleChat;
