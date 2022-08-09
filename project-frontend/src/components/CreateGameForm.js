import React from "react";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import createRandomString from '../utils/create-link';

export default function CreateGameForm() {
  const [show, setShow] = useState(false);
  const [randomString, setRandomString] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createRoom = () => {
    setRandomString(createRandomString());
  }

  return (
    <div>
      <Button
        variant="info"
        onClick={handleShow}
      >
        Create New Game
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label aria-required><h3>Game Name</h3></Form.Label>
              <Form.Control type="text" placeholder="Example Game Name" />
              <p>{randomString}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => createRoom()}>Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
