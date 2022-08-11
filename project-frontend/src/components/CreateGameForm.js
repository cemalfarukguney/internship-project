import React from "react";
import { useState, useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export default function CreateGameForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomNameRef = useRef(null);

  const { username, setUsername } = useContext(UserContext)[0];
  const { roomName, setRoomName } = useContext(UserContext)[1];

  const [userId, setUserId] = useState();
  const [gameId, setGameId] = useState();

  let stompClient;

  function connectToSocket(gameId) {
    console.log("connecting to the game");
    let socket = new SockJS("http://localhost:8080/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("connected to the frame: " + frame);
      stompClient.subscribe("/topic/game-progress/" + gameId, function (response) {
        let data = JSON.parse(response.body);
        //console.log(data);
      });
    });
  }

  function callData(){
    axios.get(`http://localhost:8080/callData/32`)
  }

  async function handleCreate(callback) {
    setRoomName(roomNameRef.current.value);
    await axios
      .post(`http://localhost:8080/createGame/${username}`, {
        userName: username,
      })
      .then(function (response) {
        console.log(response.data)
        console.log("game id: ", response.data.gameId)
        setUserId(response.data.userId);
        setGameId(response.data.gameId);
        connectToSocket(response.data.gameId);
        console.log(username)
        callback();
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

      <Modal show={show} onHide={handleClose}>
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
          <Link to="/game">
            <Button variant="primary" onClick={() => handleCreate(callData)}>
              Create
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
