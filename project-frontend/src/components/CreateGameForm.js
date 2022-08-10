import React from "react";
import { useState, useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function CreateGameForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomNameRef = useRef(null);
  const { roomName, setRoomName } = useContext(UserContext)[1];

  function handleCreate() {
    setRoomName(roomNameRef.current.value);
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
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
