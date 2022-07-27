import React from "react";
import { useState } from "react";
import { Navbar, Container, Button, Col, Row } from "react-bootstrap";
import tasks from "../tasks";
import TaskCard from "./TaskCard";

export default function TaskList(props) {
  const [taskList, setTaskList] = useState(tasks)

  // bir string degişkenin integera cevrilip cevrilemeyecegini donen fonksiyon
  function isIntegerString(value) {
    return /^\d+$/.test(value);
  }

  // task listesinin toplam storypointini dönen fonksiyon
  const sumStoryPoint = taskList.reduce((accumulator, object) => {
    if(isIntegerString(object.storyPoint)) {
      return accumulator + parseInt(object.storyPoint);
    } else {
      return accumulator
    }
  }, 0);

  const [totalPoints, setTotalPoints] = useState(sumStoryPoint);

  const changeTotalPoint = (oldStoryPoint, newStoryPoint) => {
    if(oldStoryPoint != null){
      if(isIntegerString(oldStoryPoint) && isIntegerString(newStoryPoint)){
        return (setTotalPoints(totalPoints + (parseInt(newStoryPoint)) - (parseInt(oldStoryPoint))))
      } else if(isIntegerString(oldStoryPoint) && !isIntegerString(newStoryPoint)) {
        return (setTotalPoints(totalPoints - (parseInt(oldStoryPoint)))) 
      } else if(!isIntegerString(oldStoryPoint) && isIntegerString(newStoryPoint)) {
        return(setTotalPoints(totalPoints + (parseInt(newStoryPoint))))
      } else {
        return(setTotalPoints(totalPoints))
      }
    } else {
      if(isIntegerString(newStoryPoint)){
        return(setTotalPoints(totalPoints + (parseInt(newStoryPoint))))
      } else {
        return(setTotalPoints(totalPoints))
      }
    }
  };

  const updateTaskList = (task) => {
    setTaskList(current  => current.map(obj => {
      if(obj.id === task.id) {
        return {...obj, taskName: task.taskName, taskDescription: task.taskDescription, storyPoint: task.storyPoint}
      }
      return obj;
    }))
  }

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
              updateTaskList={updateTaskList}
            />
          );
        })}
      </Container>
    </div>
  );
}
