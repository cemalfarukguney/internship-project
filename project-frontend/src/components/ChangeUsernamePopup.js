import React, { useRef } from "react";
import { Form, CloseButton, Button, Modal, Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function ChangeUsernamePopup(props) {
  const { username, setUsername } = useContext(UserContext)[0];
  const { updated, setUpdated } = useContext(UserContext)[2];
  const { gameId, setGameId } = useContext(UserContext)[3];
  const userRef = useRef(null);

  let userId;

  async function updateUsername(newName) {
    await axios.put(
      `http://localhost:8080/changeUserName/${gameId}/${userId}/${newName}`
    );
  }

  function handleSubmit() {
    setUsername(userRef.current.value);
    if (window.location.pathname === "/game") {
      userId = localStorage.getItem("token");
      console.log(
        `trying:   http://localhost:8080/changeUserName/${gameId}/${userId}/${userRef.current.value}`
      );
      updateUsername(userRef.current.value);
      setUpdated((prev) => !prev);
    }
    props.setTrigger(false);
  }

  return props.trigger ? (
    <Modal show={props.trigger} centered>
      <Modal.Header>
        <h2>What is your name?</h2>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={userRef}
            type="text"
            placeholder={username}
          ></Form.Control>
        </Form.Group>
        {props.children}
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
      <CloseButton
        className="popup--close-button"
        onClick={() => props.setTrigger(false)}
      />
    </Modal>
  ) : (
    ""
  );
}

export default ChangeUsernamePopup;
