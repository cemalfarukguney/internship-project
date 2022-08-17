import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import MainBody from "./MainBody";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import TaskListContext from "../context/TaskListContext";
import omitUndefined from "../utils/omit-undefined";
import { Navigate } from "react-router-dom";

function MainGameScreen(props) {
  const [tasks, setTasks] = useState([]);

  const [state, setState] = useState(false);

  const callbackFunction = (childData) => {
    setState(childData);
  };

  /*   async function getGameState() {
    const userId = localStorage.getItem("token");
    await axios
      .get(`http://localhost:8080/user/${userId}`)
      .then(function (response) {
        // setGameState(response.data.inGame.gameStatus);
        console.log(response.data);
      });
  }
  getGameState(); */

  return (
    <div className="main-game-screen">
      <TaskListContext.Provider value={[{ tasks, setTasks }]}>
        <Navbar parentCallback={callbackFunction} />
        <MainBody taskState={state} />
      </TaskListContext.Provider>
    </div>
  );
}

export default MainGameScreen;
