import React from "react";
import TaskList from "./TaskList";
import CardGrid from "./CardGrid";

export default function MainBody(props) {

  return (
    <div className="main--div">
      <CardGrid />
      <div>{props.taskState && <TaskList/>}</div>
    </div>
  );
}
