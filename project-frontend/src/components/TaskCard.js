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

function TaskCard(props) {
  const [show, setShow] = useState(false);
  const [storyPoint, setStoryPoint] = useState(props.task.storyPoint);
  const storyPoints = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"];
  
  const changeStoryPoint = (sp) => {
    props.changeTotalPoint(storyPoint, sp);
    console.log("Old Story Point", storyPoint);
    console.log("New Story Point", sp);
    setStoryPoint(sp);
    props.task.storyPoint = storyPoint;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="w-100 p-2">
        <Card>
          <Card.Header>PP - {props.task.id}</Card.Header>
          <Card.Body>
            <Button
              variant="outline-danger"
              className="float-end"
              onClick={handleShow}
              style={{ marginLeft: "20px", fontSize: "10px" }}
            >
              <CgMore />
            </Button>
            <Card.Title>{props.task.taskName}</Card.Title>
            <Button variant="primary">Vote this issue</Button>
            <DropdownButton variant="dark" 
                            className="float-end" 
                            style={{
                                  size: "lg",
                                  marginLeft: "10px",
                                  fontSize: "23px",}} 
                            id="dropdown-basic-button" 
                            title={storyPoint}>
              {storyPoints?.map((selectedStoryPoint, index) => (
                <Dropdown.Item key={index} onClick={() => changeStoryPoint(selectedStoryPoint)}>{selectedStoryPoint}</Dropdown.Item>
              ))}
            </DropdownButton>
            <Button variant="info" className="float-end">
              ortalama
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Spring</Form.Label>
              <Form.Control
                type="text"
                value="Örnek Spring"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={props.task.taskName}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" value={props.task.taskDescription} rows={3} />
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
