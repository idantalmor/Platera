import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";
import PrivateRoute from "./components/privateRoute";
import { useState } from "react";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  const [isLogged,setIsLogged] = useState(false)
  return (
    <AuthContextProvider>
      <Router>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route element={<PrivateRoute isLogged={isLogged} setIsLogged={setIsLogged} />}>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/chat/:id" element={<ChatScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
