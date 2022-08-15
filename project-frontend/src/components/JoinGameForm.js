import React from "react";
import { useState, useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { updateGameState } from "./MainBody";

function JoinGameForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomIdRef = useRef(null);

  let stompClient;

  const { username, setUsername } = useContext(UserContext)[0];
  const { updated, setUpdated } = useContext(UserContext)[2];

  const [gameId, setGameId] = useState(0);
  const [userId, setUserId] = useState(0);

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
          updateGameState(response);
          setUpdated((prev) => !prev);
          //console.log(data);
        }
      );
    });
  }

  function callData(id) {
    axios.get(`http://localhost:8080/callData/${id}`);
  }

  async function handleJoin(callback) {
    // setGameId(roomIdRef.current.value);
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
        const token = response.data.userId;
        localStorage.clear();
        localStorage.setItem("token", token);
        console.log("Token saved: " + token);
        connectToSocket(response.data.gameId);
        console.log(username);
        // callback(response.data.gameId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //console.log("room id: ", roomIdRef);
  //console.log("username: ", username);

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
          <Link to="/game">
            <Button variant="primary" onClick={() => handleJoin(callData)}>
              Join
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinGameForm;
