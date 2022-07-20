import React from "react";
import {useState} from 'react';

import TaskList from "./TaskList";
import {Button} from "react-bootstrap";

export default function MainBody(props){

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
      setIsShown(current => !current);
    };

    return(
        <div className="main--div">
            PICK YOUR CARDS
            <div>
                {props.taskState && <TaskList handleClick={handleClick} />}
            </div>
        </div>
    );
}