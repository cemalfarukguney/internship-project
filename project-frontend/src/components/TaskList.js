import React from "react";
import { Navbar, Container, Button, Col, Row } from "react-bootstrap";
import TaskCard from "./TaskCard";
import TaskListContext from "../context/TaskListContext";
import StoryPoints from "./StoryPoints";
import axios from 'axios';

export default function TaskList(props) {

  async function handleCreate() {
    await axios
      .post(`http://localhost:8080/addIssue/1/1`, {
        issueName: "backend işleri",
        description: "adasdasdasdasd"
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("kk")
  }

  async function voteIssue() {
    axios.get(`http://localhost:8080/selectIssue/1/1`);
  }

  async function revealCard() {
    axios.get(`http://localhost:8080/revealCards/1`);
  }

  async function twoPoint() {
    await axios
      .post(`http://localhost:8080/addPoint/1/1/2`, {})
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log("puan verildi")
  }

  return (
    <div>
      <TaskListContext.Consumer>
        {([tasks]) => (
          <Container
            className="square border border-dark float-end overflow-auto"
            style={{ width: "600px", maxHeight: "800px" }}
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
                <Button onClick={voteIssue}>select issue</Button>
                <Button onClick={revealCard}>reveal card</Button>
                <Button onClick={twoPoint}>2 puan ver</Button>

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
                <Col sm={4}>
                  <Button variant="outline-dark">Import from JIRA</Button>
                </Col>
              </Container>
            </Navbar>
            {tasks.map((task, index) => {
              return <TaskCard key={task.id} task={task} />;
            })}
          </Container>
        )}
      </TaskListContext.Consumer>
    </div>
  );
}
