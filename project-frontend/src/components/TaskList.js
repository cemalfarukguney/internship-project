import React, { useState, useContext, useEffect } from "react";
import { Navbar, Container, Button, Col, Row } from "react-bootstrap";
import TaskCard from "./TaskCard";
import TaskListContext from "../context/TaskListContext";
import StoryPoints from "./StoryPoints";
import axios from "axios";
import { UserContext } from "../context/UserContext";

let tempTasks = [];

export function updateTasks(updatedTasks) {
  tempTasks = updatedTasks;
  console.log("TASKS UPDATED...");
}

export default function TaskList(props) {
  const [points, setPoints] = useState([]);
  const { selectedIssue, setSelectedIssue } = useContext(UserContext)[4];
  const { updated, setUpdated } = useContext(UserContext)[2];
  const { tasks, setTasks } = useContext(TaskListContext)[0];
  const { gameId, setGameId } = useContext(UserContext)[3];
  const userId = localStorage.getItem("token");

  let isMounted = false;
  useEffect(() => {
    console.log("in useEffect taskList changed");
    setTasks(tempTasks);
  }, [updated, isMounted]);

  async function handleCreate() {
    await axios
      .post(`http://localhost:8080/addIssue/${gameId}/${userId}`, {
        issueName: "Backlog tasklarını için story point belirlenmesi.",
        description: "Staj projesi: Sprintlerdeki backlog taskları için storypoint belirlenmesi gerekmektedir.",
      })
      .then(function (response) {
        console.log(response.data);
        console.log(`${userId} id'li kullanıcı task ekledi...`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {(isMounted = true)}
      <Container
        className="square border border-dark float-end overflow-auto"
        style={{ width: "600px", maxHeight: "700px" }}
      >
        <Navbar>
          <Container
            className="square border border-dark"
            style={{ height: "100px" }}
          >
            <Col sm={3}>
              <Navbar.Brand>ISSUES</Navbar.Brand>
            </Col>
            <Button onClick={handleCreate}>add issue</Button>
            <Col sm={5}>
              <Row>
                <Navbar.Text>{tasks.length} issues</Navbar.Text>
              </Row>
              <Row>
                <Navbar.Text>
                  <StoryPoints tasks={tasks} />
                </Navbar.Text>
              </Row>
            </Col>
          </Container>
        </Navbar>
        {tasks.map((task, index) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </Container>
    </div>
  );
}
