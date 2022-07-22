import React from "react";
import { useState } from "react";
import { Navbar, Container, Button, Col, Row } from "react-bootstrap";

import TaskCard from "./TaskCard";

export default function TaskList(props) {
  const taskList = props.taskList;

  const sumStoryPoint = taskList.reduce((accumulator, object) => {
    return accumulator + parseInt(object.storyPoint);
  }, 0);

  const [totalPoints, setTotalPoints] = useState(sumStoryPoint);


  const changeTotalPoint = (oldStoryPoint, newStoryPoint) => {
    return (
      setTotalPoints(
        totalPoints + (parseInt(newStoryPoint) - parseInt(oldStoryPoint))
      )
    )
  };

  return (
    <div>
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
                <Navbar.Text>{taskList.length} issues</Navbar.Text>
              </Row>
              <Row>
                <Navbar.Text>{totalPoints} point</Navbar.Text>
              </Row>
            </Col>
            <Col sm={4}>
              <Button variant="outline-dark">Import from JIRA</Button>
            </Col>
          </Container>
        </Navbar>
        {taskList.map((task, index) => {
          return (
            <TaskCard
              key={index}
              task={task}
              changeTotalPoint={changeTotalPoint}
            />
          );
        })}
      </Container>
    </div>
  );
}
