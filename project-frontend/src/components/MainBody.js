import React from "react";
import TaskList from "./TaskList";
import CardGrid from "./CardGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

let gameState = "";

export function updateGameState(response) {
  gameState = gameState + "a";
  console.log("mmmmm");
  console.log("RESPONSE: " + response);
  console.log("Game State: " + gameState);
}

export default function MainBody(props) {
  const sendToConsole = () => {
    console.log(localStorage.getItem("token"));
    axios.get(`http://localhost:8080/callData/1`);
  };

  return (
    <div className="main--div">
      <button onClick={sendToConsole}>click</button>
      <CardGrid gameState={props.gameState} />
      <div>{props.taskState && <TaskList />}</div>
    </div>
  );
}
