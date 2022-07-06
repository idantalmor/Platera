import React from 'react'
import Title from '../../components/Title'
import Button2 from "@mui/material/Button";
import { UserAuth } from '../../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'

const HomeScreen = () => {

  const {user, logout} = UserAuth();
  const navigate = useNavigate()
  const handleLogout = async () =>{
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
  }
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
          <Button2
              onClick={() => handleLogout()}
              variant="contained"
              size={"large"}
            >
              Log out
            </Button2>
        </div>
      </div>
  )
}

export default HomeScreen
