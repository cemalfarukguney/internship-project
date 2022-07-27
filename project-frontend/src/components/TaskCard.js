import React, { useCallback } from "react";
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
import { useForm } from "react-hook-form";

import { CgMore } from "react-icons/cg";
import TaskListContext from "../context/TaskListContext";

function TaskCard(props) {
  const { task } = props;
  const { storyPoint } = task;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <TaskListContext.Consumer>
      {([, , updateTask]) => (
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
                <Card.Title>{task.title}</Card.Title>
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
                  {storyPoints?.map((storyPoint, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => updateTask(task.id, { storyPoint })}
                    >
                      {storyPoint}
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
              <form>
                <label className="form-label" htmlFor="sprint">
                  <h4>Sprint</h4>
                </label>
                <input
                  id="sprint"
                  className="form-control"
                  defaultValue={"Örnek Sprint"}
                  {...register("sprint")}
                  disabled={true}
                />

                <label className="form-label" htmlFor="title" style={{marginTop:"10px"}}>
                  <h4>Title</h4>
                </label>
                <input
                  id="title"
                  className="form-control"
                  defaultValue={task.title}
                  {...register("title")}
                />

                <label className="form-label" htmlFor="description" style={{marginTop:"10px"}}>
                  <h4>Description</h4>
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  defaultValue={task.description}
                  rows={3}
                  {...register("description")}
                ></textarea>

                <label className="form-label" htmlFor="story-point" style={{marginTop:"10px"}}>
                  <h4>Story Point</h4>
                </label>
                <input
                  id="story-point"
                  className="form-control"
                  defaultValue={task.storyPoint}
                  {...register("storyPoint")}
                  disabled={true}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit((vals) => {
                  updateTask(task.id, vals);
                  setShow(false);
                })}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </TaskListContext.Consumer>
  );
}

export default TaskCard;
