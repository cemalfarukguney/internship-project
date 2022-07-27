import React from "react";
import { Navbar, Container, Button, Col, Row } from "react-bootstrap";
import TaskCard from "./TaskCard";
import TaskListContext from "../context/TaskListContext";
import StoryPoints from "./StoryPoints";

export default function TaskList(props) {
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
                  <Navbar.Brand>Issues</Navbar.Brand>
                </Col>
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
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                />
              );
            })}
          </Container>
        )}
      </TaskListContext.Consumer>
    </div>
  );
}
