import React from "react";
import { Navbar, Container, Button, Col, Row} from "react-bootstrap";

import TaskCard from "./TaskCard";

export default function TaskList(props) {

  const taskList = props.taskList;
  let totalPoints = 0;
  
  taskList.map((task) => {
    return(totalPoints += parseInt(task.storyPoint));
  })

  return (
    <div>
      <Container className="square border border-dark float-end overflow-auto" style={{"width": "600px", maxHeight: "800px"}}>
        <Navbar>
          <Container className="square border border-dark" style={{"height": "100px"}}>
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
        {taskList.map((task) => {
          return (<TaskCard task={task}/>)
        })}
      </Container>
    </div>
  );
}
