import React from "react";
import TaskList from "./TaskList";
import CardGrid from "./CardGrid";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

let gameStateVar = "";

export function updateGameState(response) {
  gameStateVar = response;
  console.log("GameStateVar: " + gameStateVar);
}

export default function MainBody(props) {
  const [gameState, setGameState] = useState("CREATED");
  const { updated, setUpdated } = useContext(UserContext)[2];

  const sendToConsole = () => {
    console.log(localStorage.getItem("token"));
    axios.get(`http://localhost:8080/callData/1`);
  };

  let isMounted = false;

  useEffect(() => {
    if (isMounted) {
      setGameState(gameStateVar);
    }
  }, [updated]);

  return (
    <div className="main--div">
      {(isMounted = true)}
      {gameState === "VOTING" && <CardGrid />}
      {props.taskState && <TaskList />}
    </div>
  );
}
