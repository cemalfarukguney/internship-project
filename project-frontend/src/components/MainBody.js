import React from "react";
import TaskList from "./TaskList";
import CardGrid from "./CardGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function MainBody(props) {

  const sendToConsole = () => {
    axios.get(`http://localhost:8080/callData/29`)
  }

  return (
    <div className="main--div">
      <button onClick={sendToConsole}>click</button>
      <CardGrid />
      <div>{props.taskState && <TaskList />}</div>
    </div>
  );
}
