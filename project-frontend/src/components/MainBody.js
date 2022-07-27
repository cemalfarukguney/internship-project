import React from "react";
import TaskList from "./TaskList";

export default function MainBody(props) {

  return (
    <div className="main--div">
      PICK YOUR CARDS
      <div>{props.taskState && <TaskList/>}</div>
    </div>
  );
}
