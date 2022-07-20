import React from "react";
import { useState } from 'react';
import {
  Button,
  Card,
  Container,
  OverlayTrigger,
  Popover,
  Modal,
  Form
} from "react-bootstrap";

import StoryPoints from "./StoryPoints";
import {CgMore} from "react-icons/cg"

function TaskCard() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="w-100 p-2">
        <Card>
          <Card.Header>PP - 1</Card.Header>
          <Card.Body>
            <Button variant="outline-danger" className="float-end" onClick={handleShow} style={{marginLeft: "20px", fontSize: "10px"}}><CgMore/></Button>
            <Card.Title>TaskName</Card.Title> 
            <Button variant="primary">Vote this issue</Button>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose
              overlay={
                <Popover title="Popover bottom">
                  <StoryPoints />
                </Popover>
              }
            >
              <Button
                variant="dark"
                className="float-end"
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "10px",
                  fontSize: "23px",
                }}
              >
                8
              </Button>
            </OverlayTrigger>
            <Button variant="info" className="float-end">
              7.6
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskCard;
