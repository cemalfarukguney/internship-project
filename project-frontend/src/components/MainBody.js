import React from "react";
import {useState} from 'react';

import TaskList from "./TaskList";
import {Button} from "react-bootstrap";

export default function MainBody(){

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
      setIsShown(current => !current);
    };

    return(
        <div className="main--div">
            PICK YOUR CARDS
            <div>
                <Button className="float-end" onClick={handleClick}>Task List</Button>
                {isShown && <TaskList handleClick={handleClick} />}
            </div>
        </div>
    );
}