import React from "react";
import { useState, useContext, useRef } from "react";
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
//import TaskListContext from "../context/TaskListContext";

export default function CreateGameForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomNameRef = useRef(null);

  const { username, setUsername } = useContext(UserContext)[0];
  const { roomName, setRoomName } = useContext(UserContext)[1];
  const { updated, setUpdated } = useContext(UserContext)[2];
  const { gameId, setGameId } = useContext(UserContext)[3];
  const { selectedIssue, setSelectedIssue } = useContext(UserContext)[4];

  const [userId, setUserId] = useState(0);

  let stompClient;
  const navigate = useNavigate();

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
          console.log("Mesaj!!!!!?_");
          console.log("DATA: " + data);
          let voters = data.users.map((a) => a.name);
          let doneVoters = data.userVotes ? data.userVotes : [];
          updateVoterState(doneVoters);
          console.log("USERNAME: " + voters);
          updateGameState(data.game.gameStatus);

          data.game.selectedIssue
            ? setSelectedIssue(data.game.selectedIssue.id)
            : setSelectedIssue(0);

          let tasks = data.issues;
          updateTasks(tasks);
          updateIssuePoint(data.issuePoints);

          setUpdated((prev) => !prev);
          console.log("ISSUE POINTS:", data.issuePoints);
        }
      );
    });
  }

  let saveResponse;

  function callData(id) {
    console.log(gameId);
    axios.get(`http://localhost:8080/callData/${id}`);
    setGameId(saveResponse.data.gameId);
    setUserId(saveResponse.data.userId);
  }

  async function handleCreate(callback) {
    setRoomName(roomNameRef.current.value);
    let tempGameId;
    await axios
      .post(
        `http://localhost:8080/createGame/${username}/${roomNameRef.current.value}`,
        {
          userName: username,
        }
      )
      .then(function (response) {
        console.log(response.data);
        console.log("game id: ", response.data.gameId);
        const token = response.data.userId;
        tempGameId = response.data.gameId;
        localStorage.clear();
        localStorage.setItem("token", token);
        console.log("Token saved: " + token);
        saveResponse = response;
        connectToSocket(response.data.gameId);
      })
      .then(function () {
        navigate("/game");
        callback(tempGameId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="home--button">
        Create New Game
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label aria-required>
                <h3>Game Name</h3>
              </Form.Label>
              <Form.Control
                ref={roomNameRef}
                type="text"
                placeholder="Example Game Name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleCreate(callData)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
