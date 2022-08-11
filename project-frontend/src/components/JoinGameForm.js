import React from "react";
import { useState, useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function JoinGameForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomIdRef = useRef(null);

  const {username, setUsername} = useContext(UserContext)[0];

  const [gameId, setGameId] = useState([]);
  const [userId, setUserId] = useState([]);

  const handleJoin = () => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/joinGame/${roomIdRef.current.value}/${username}`);
      setGameId(response.data[0]);
      setUserId(response.date[1]);
    };
    fetchData();
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
            <Button variant="primary" onClick={handleJoin}>
              Join
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinGameForm;
