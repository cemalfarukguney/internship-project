import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { CgMore } from "react-icons/cg";

function TaskCard() {
  const [show, setShow] = useState(false);
  const [storyPoint, setStoryPoint] = useState("-");
  const storyPoints = ["1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"];
  
  const changeStoryPoint = (sp) => {
    setStoryPoint(sp);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="w-100 p-2">
        <Card>
          <Card.Header>PP - 1</Card.Header>
          <Card.Body>
            <Button
              variant="outline-danger"
              className="float-end"
              onClick={handleShow}
              style={{ marginLeft: "20px", fontSize: "10px" }}
            >
              <CgMore />
            </Button>
            <Card.Title>TaskName</Card.Title>
            <Button variant="primary">Vote this issue</Button>
            <DropdownButton variant="dark" 
                            className="float-end" 
                            style={{
                                  size: "lg",
                                  marginLeft: "10px",
                                  fontSize: "23px",}} 
                            id="dropdown-basic-button" 
                            title={storyPoint}>
              {storyPoints?.map((selectedStoryPoint) => (
                <Dropdown.Item onClick={() => changeStoryPoint(selectedStoryPoint)}>{selectedStoryPoint}</Dropdown.Item>
              ))}
            </DropdownButton>
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
