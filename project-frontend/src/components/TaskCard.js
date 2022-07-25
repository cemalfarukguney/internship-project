import React from "react";
import { useState, useEffect } from "react";
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
  const storyPoints = [
    "0",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "55",
    "89",
    "?",
  ];

  const [taskName, setTaskName] = useState(props.task.taskName);
  const [taskDescription, setTaskDescription] = useState(props.task.taskDescription);

  const [tempTaskName, setTempTaskName] = useState(props.task.taskName)
  const [tempTaskDescription, setTempTaskDescription] = useState(props.task.taskDescription)

  const changeHandlerTaskName = (e) => {
    setTempTaskName(e.target.value);
  }

  const changeHandlerTaskDescription = (e) => {
    setTempTaskDescription(e.target.value);
  }

  const closeButtonDoes = () => {
    setTempTaskName(props.task.taskName)
    setTempTaskDescription(props.task.taskDescription)
    handleClose();
  }

  const saveButtonDoes = () => {
    setTaskName(tempTaskName)
    setTaskDescription(tempTaskDescription)
    setLastTask({
      ...lastTask,
      taskName: taskName,
      taskDescription: taskDescription
    })
    handleClose();
  }

  const changeStoryPoint = (sp) => {
    props.changeTotalPoint(storyPoint, sp);
    setStoryPoint(sp);
    props.task.storyPoint = storyPoint;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [lastTask, setLastTask] = useState({
    id: props.task.id,
    taskName: taskName,
    taskDescription: taskDescription,
    storyPoint: storyPoint
  })

  useEffect(() => console.log(taskName), [taskName]);

  console.log(lastTask);
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
            <DropdownButton
              variant="dark"
              className="float-end"
              style={{
                size: "lg",
                marginLeft: "10px",
                fontSize: "23px",
              }}
              id="dropdown-basic-button"
              title={storyPoint ? storyPoint : "-"}
            >
              {storyPoints?.map((selectedStoryPoint, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => changeStoryPoint(selectedStoryPoint)}
                >
                  {selectedStoryPoint}
                </Dropdown.Item>
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
              <Form.Label>
                <h4>Spring</h4>
              </Form.Label>
              <Form.Control type="text" value="Örnek Spring" disabled={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>
                <h4>Task Name</h4>
              </Form.Label>
              <Form.Control
                type="text"
                required={true}
                defaultValue={taskName}
                onChange={changeHandlerTaskName}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <h4>Task Description</h4>
              </Form.Label>
              <Form.Control
                as="textarea"
                required={true}
                defaultValue={taskDescription}
                rows={3}
                onChange={changeHandlerTaskDescription}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <h4>Story Point</h4>
              </Form.Label>
              <Form.Control
                type="text"
                required={true}
                disabled={true}
                defaultValue={storyPoint ? storyPoint : "-"}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeButtonDoes}>
            Close
          </Button>
          <Button variant="primary" onClick={saveButtonDoes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskCard;
