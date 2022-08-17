import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { updateGameState } from "./MainBody";
import { updateVoterState } from "./CardGrid";
import { useNavigate } from "react-router-dom";
import { updateTasks } from "./TaskList";
import { updateIssuePoint } from "./VoteList";

function JoinGameForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomIdRef = useRef(null);

  let stompClient;
  const navigate = useNavigate();

  const { username, setUsername } = useContext(UserContext)[0];
  const { updated, setUpdated } = useContext(UserContext)[2];
  const { gameId, setGameId } = useContext(UserContext)[3];
  const { selectedIssue, setSelectedIssue } = useContext(UserContext)[4];

  const [userId, setUserId] = useState(0);
  // const [done, setDone] = useState(false);

  function connectToSocket(gameId) {
    console.log("connecting to the game");
    let socket = new SockJS("http://localhost:8080/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("connected to the frame: " + frame);
      stompClient.subscribe(
        "/topic/game-progress/" + gameId,
        function (response) {
          let data = JSON.parse(response.body);
          let doneVoters = data.userVotes ? data.userVotes : [];
          updateVoterState(doneVoters);
          updateGameState(data.game.gameStatus);
          data.game.selectedIssue
            ? setSelectedIssue(data.game.selectedIssue.id)
            : setSelectedIssue(0);

          updateIssuePoint(data.issuePoints);
          let tasks = data.issues;
          updateTasks(tasks);

          setUpdated((prev) => !prev);
        }
      );
    });
  }

  function callData(id) {
    axios.get(`http://localhost:8080/callData/${id}`);
  }

  async function handleJoin(callback) {
    // setGameId(roomIdRef.current.value);
    let tempGameId;
    await axios
      .get(
        `http://localhost:8080/joinGame/${roomIdRef.current.value}/${username}`,
        {
          userName: username,
        }
      )
      .then(function (response) {
        console.log(response.data);
        console.log("game id: ", response.data.gameId);
        setUserId(response.data.userId);
        setGameId(response.data.gameId);
        tempGameId = response.data.gameId;
        const token = response.data.userId;
        localStorage.clear();
        localStorage.setItem("token", token);
        console.log("Token saved: " + token);
        connectToSocket(response.data.gameId);
        console.log(username);
      })
      .then(function () {
        navigate("/game");
        callData(tempGameId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="home--button">
        Join Game
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label aria-required>
                <h3>Game Id</h3>
              </Form.Label>
              <Form.Control
                ref={roomIdRef}
                type="text"
                placeholder="Enter Game Id"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleJoin(callData);
            }}
          >
            Join
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinGameForm;
