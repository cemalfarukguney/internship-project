import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import MainGameScreen from "./components/MainGameScreen";
import Home from "./components/Home";

function App() {
  const [username, setUsername] = useState("Name");
  const [roomName, setRoomName] = useState("Room");
  const [updated, setUpdated] = useState(false);
  const [gameId, setGameId] = useState(-1);

  function hasJwt() {
    let flag = false;
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  }

  return (
    <div className="App">
      <UserContext.Provider
        value={[
          { username, setUsername },
          { roomName, setRoomName },
          { updated, setUpdated },
          { gameId, setGameId },
        ]}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<MainGameScreen />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
