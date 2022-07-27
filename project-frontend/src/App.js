import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import {useState} from 'react';

import tasks from "./tasks";
import { UserContext } from './UserContext';

function App() {
  const[username, setUsername] = useState("Name");
  const[roomName, setRoomName] = useState("Room");

  const[state, setState] = useState(false);

  const callbackFunction = (childData) => {
    setState(childData);
  }
  
  return (
    <div className="App">
      <Navbar parentCallback={callbackFunction} username="Name" roomName="Room312"/>
      <MainBody taskState={state} />

      <UserContext.Provider value={[{username, setUsername},{roomName, setRoomName}]}>
        <Navbar parentCallback={callbackFunction}/>
        <MainBody taskState={state} taskList={taskList} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
