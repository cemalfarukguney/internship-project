import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Button} from "react-bootstrap";

import TaskList from './components/TaskList';

function App() {

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

  return (
    <div className="App">
      <Button className="float-end" onClick={handleClick}>TaskList</Button>
      {isShown && <TaskList />}
    </div>
  );
}

export default App;
