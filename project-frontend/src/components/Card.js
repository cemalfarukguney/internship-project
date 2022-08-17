import React, {useState, useContext} from "react";
import axios from 'axios';
import { UserContext } from "../context/UserContext";

function Card(props) {

  const {gameId, setGameId} = useContext(UserContext)[3]
  const {selectedIssue, setSelectedIssue} = useContext(UserContext)[4]
  const userId = localStorage.getItem("token");

  return (
    <div className="card--div">
      {props.selectedNo !== props.number && (
        <button
          className="card--div-button"
          onClick={() => {
            props.selectCard(props.number);
            props.onClick(gameId, selectedIssue, userId, props.number);
          }}
        >
          {props.number}
        </button>
      )}
      {props.selectedNo === props.number && (
        <button
          className="card--div-button-selected"
          onClick={() => {
            props.selectCard(props.number);
            props.onClick(props.number);
          }}
        >
          {props.number}
        </button>
      )}
    </div>
  );
}

export default Card;
