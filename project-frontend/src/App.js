import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import MainGameScreen from "./components/MainGameScreen";
import Home from "./components/Home";

function App() {
  const [username, setUsername] = useState("Name");
  const [roomName, setRoomName] = useState("Room");
  return (
    <div className="App">
      <UserContext.Provider
        value={[
          { username, setUsername },
          { roomName, setRoomName },
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
