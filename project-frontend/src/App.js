import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import {useCallback, useState, useEffect} from 'react';
import axios from "axios";
import { UserContext } from './UserContext';
import TaskListContext from './context/TaskListContext';
import omitUndefined from './utils/omit-undefined';
import CreateGameForm from './components/CreateGameForm';

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/issues');
      setTasks(response.data);
    }
    fetchData();
  }, []);

  const[username, setUsername] = useState("Name");
  const[roomName, setRoomName] = useState("Room");

  const[state, setState] = useState(false);

  const callbackFunction = (childData) => {
    setState(childData);
  }
  const updateTask = useCallback((id, props) => {
    const idx = tasks.findIndex(t => t.id === id);

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
  }, [
    tasks,
    setTasks,
  ]);

  return (
    <div className="App">
      <UserContext.Provider value={[{username, setUsername},{roomName, setRoomName}]}>
        <TaskListContext.Provider value={[tasks, setTasks, updateTask]}>
          <Navbar parentCallback={callbackFunction}/>
          <MainBody taskState={state} />
          <CreateGameForm/>
        </TaskListContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
