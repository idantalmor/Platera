import React from "react";

const DetailsChat = ({ name, members }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontWeight: "bold" }}>{name}</h1>
      </div>
      <h3 style={{ textDecorationLine: "underline" }}>Group Members:</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {members?.map((member, index) => (
          <div key={member.id}>
            {members[index + 1] ? (
              <h4>{member.email.split("@")[0]} , </h4>
            ) : (
              <h4>{member.email.split("@")[0]}</h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsChat;
