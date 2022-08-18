import React from "react";
import { Form, CloseButton, Button, Modal, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function InvitationPopup(props) {
  const [copySuccess, setCopySuccess] = useState("");
  const { gameId, setGameId } = useContext(UserContext)[3];

  return props.trigger ? (
    <Modal show={props.trigger} centered>
      <Modal.Header>
        <h2>Invite Colleagues</h2>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Game's ID</Form.Label>
          <Form.Control type="text" value={gameId}></Form.Control>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            onClick={() => {
              navigator.clipboard.writeText(gameId);
              setCopySuccess("Copied!");
            }}
          >
            Copy Game ID
          </Button>
        </div>
        {props.children}
      </Modal.Body>
      {copySuccess && (
        <Alert variant="primary">
          <p className="mb-0 text-center">Game ID Copied Successfully</p>
        </Alert>
      )}
      <CloseButton
        className="popup--close-button"
        onClick={() => {
          props.setTrigger(false);
          setCopySuccess("");
        }}
      />
    </Modal>
  ) : (
    ""
  );
}

export default InvitationPopup;
