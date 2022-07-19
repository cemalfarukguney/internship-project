import React from "react";
import { Navbar, Container, Button, Col, Row} from "react-bootstrap";
import { MdCancel } from 'react-icons/md';
//import { FiMoreVertical } from 'react-icons/fi'

import TaskCard from "./TaskCard";

export default function TaskList() {
  return (
    <div>
      <Container className="square border border-dark" style={{"width": "600px"}}>
        <Navbar>
          <Container className="square border border-dark" style={{"height": "100px"}}>
            <Col sm={3}>
              <Navbar.Brand>Issues</Navbar.Brand>
            </Col>
            <Col sm={5}>
              <Row>
                <Navbar.Text>3 issues</Navbar.Text>
              </Row>
              <Row>
                <Navbar.Text>24 point</Navbar.Text>
              </Row>
            </Col>
            <Col sm={2}>
              <Button variant="light" style={{"backgroundColor": "skyblue"}}>Import from JIRA</Button>
            </Col>
            <Col>
              <Button variant="danger" className="float-end"><MdCancel /></Button>
            </Col>
          </Container>
        </Navbar>
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </Container>
    </div>
  );
}
