import React from "react";
import { useState, useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function CreateGameForm() {
  const [show, setShow] = useState(false);
  const [randomString, setRandomString] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="home--button">
        Create New Game
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label aria-required><h3>Game Name</h3></Form.Label>
              <Form.Control type="text" placeholder="Example Game Name" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
