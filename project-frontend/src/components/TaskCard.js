import React, { useContext } from "react";
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
import { UserContext } from "../context/UserContext";

import { CgMore } from "react-icons/cg";
import TaskListContext from "../context/TaskListContext";
import axios from "axios";

function TaskCard(props) {
  const { task } = props;
  const { storyPoint } = task;
  const { selectedIssue, setSelectedIssue } = useContext(UserContext)[4]
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

  const userId = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let gameId;
  async function fetchData() {
    const userId = localStorage.getItem("token");
    await axios
      .get(`http://localhost:8080/user/${userId}`)
      .then(function (response) {
        gameId = response.data.inGame.id;
        console.log("adasd:", response.data.inGame.id);
      });
  }

  async function voteIssue() {
    await axios.get(`http://localhost:8080/selectIssue/${gameId}/${task.id}`);
    setSelectedIssue(task.id);
    console.log(`${task.id} id'li issue seçildi.`);
  }

  async function updateTask(newPoint) {
    await axios
      .get(`http://localhost:8080/appendPointIssue/${gameId}/${task.id}/${newPoint}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const storyPointValues = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

  async function getClosest(storyPoint){
    var closestID;
    let diff = 1000;
    for(let i = 0; i < storyPointValues.length; i++){
      if(Math.abs(storyPointValues[i]-storyPoint) < diff){
        diff = Math.abs(storyPointValues[i]-storyPoint);
        closestID = i;
      }
    }
    console.log(storyPointValues[closestID]);
    return storyPointValues[closestID];
  }

  getClosest(storyPoint);
  fetchData();

  return (
    <TaskListContext.Consumer>
      {([]) => (
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
                <Card.Title>{task.issueName}</Card.Title>
                <Button style={{background: task.id === selectedIssue ? 'green' : 'blue'}} variant="primary" onClick={() => voteIssue()}>
                  {`${task.id === selectedIssue ? "Voting Now" : "Vote this issue"}`}
                </Button>
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
                      onClick={() => updateTask(storyPoint)}
                    >
                      {storyPoint}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <Button variant="info" className="float-end">
                  {storyPoint}
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

                <label
                  className="form-label"
                  htmlFor="title"
                  style={{ marginTop: "10px" }}
                >
                  <h4>Title</h4>
                </label>
                <input
                  id="issueName"
                  className="form-control"
                  defaultValue={task.issueName}
                  {...register("title")}
                  disabled={true}
                />

                <label
                  className="form-label"
                  htmlFor="description"
                  style={{ marginTop: "10px" }}
                >
                  <h4>Description</h4>
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  defaultValue={task.description}
                  rows={3}
                  {...register("description")}
                  disabled={true}
                ></textarea>

                <label
                  className="form-label"
                  htmlFor="story-point"
                  style={{ marginTop: "10px" }}
                >
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
          </Modal>
        </>
      )}
    </TaskListContext.Consumer>
  );
}

export default TaskCard;
