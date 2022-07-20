import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import {useState} from 'react';

function App() {
  const[state, setState] = useState(false);

  const callbackFunction = (childData) => {
    setState(childData);
  }
  return (
    <div className="App">
      <Navbar parentCallback={callbackFunction}/>
      <MainBody taskState={state}/>
    </div>
  );
}

export default App;