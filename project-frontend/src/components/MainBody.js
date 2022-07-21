import React from "react";
import TaskList from "./TaskList";

export default function MainBody(props) {

  console.log(props.taskList)

  return (
    <div className="main--div">
      PICK YOUR CARDS
      <div>{props.taskState && <TaskList taskList={props.taskList}/>}</div>
    </div>
  );
}
