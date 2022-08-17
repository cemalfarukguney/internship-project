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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/issues");
      setTasks(response.data);
    };
    fetchData();
  }, []);

  const [state, setState] = useState(false);

  const callbackFunction = (childData) => {
    setState(childData);
  };

  const updateTask = useCallback(
    (id, props) => {
      const idx = tasks.findIndex((t) => t.id === id);

      if (idx < 0) {
        return; // task is not found
      }

      const orig = tasks[idx];
      const updated = {
        ...orig,
        ...omitUndefined(props),
      };
      const ntasks = tasks.slice();

      ntasks.splice(idx, 1, updated);

      setTasks(ntasks);
    },
    [tasks, setTasks]
  );

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
      <TaskListContext.Provider value={[{tasks, setTasks}, {updateTask}]}>
        <Navbar parentCallback={callbackFunction} />
        <MainBody taskState={state} />
      </TaskListContext.Provider>
    </div>
  );
}

export default MainGameScreen;
