import React from "react";
import ChatBubbleCurrentUser from "../../../assets/ChatBubbleCurnnetUser.png";
import Box from '@mui/material/Box';

const MessageBox = ({ text, user, createdAt }) => {
  return (
    <>
    <div style={{display:'flex', alignItems:'center', marginLeft:'2%'}}>

    <h5 style={{fontSize:'14px', color:'black'}}> {user} </h5>
    </div>
    <Box
    sx={{
      width: 200,
      height: 100,
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
      marginBottom: 5,
      borderRadius: 30,
      
    }}
  >
    <div style={{padding: '10%'}}>
      <div style={{ display:'flex', justifyContent:'center', textAlign:'center'}}>
          
        </div>
        <div style={{ display:'flex', justifyContent:'center', textAlign:'center'}}>
          <h5 style={{fontSize:'14px', color:'black'}}> {text} </h5>
        </div>
        <div style={{ display:'flex', justifyContent:'center', textAlign:'center'}}>
          <h5 style={{fontSize:'10px', border: '1px solid black', padding: 4, borderRadius:10, color:'black'}}> {createdAt} </h5>
        </div>

      </div>
  </Box>
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
