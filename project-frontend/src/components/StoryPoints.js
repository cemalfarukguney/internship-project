import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";

function StoryPoints() {
  return (
    <Container
      className="square border border-dark"
      style={{ marginTop: "35px" }}
    >
      <Col>
        <Row><Button variant="light">0</Button></Row>
        <Row><Button variant="light">1</Button></Row>
        <Row><Button variant="light">2</Button></Row>
        <Row>
          <Button variant="light">3</Button>
        </Row>
        <Row>
          <Button variant="light">5</Button>
        </Row>
        <Row>
          <Button variant="light">8</Button>
        </Row>
        <Row>
          <Button variant="light">13</Button>
        </Row>
        <Row>
          <Button variant="light">21</Button>
        </Row>
        <Row>
          <Button variant="light">34</Button>
        </Row>
        <Row>
          <Button variant="light">55</Button>
        </Row>
        <Row>
          <Button variant="light">89</Button>
        </Row>
        <Row>
          <Button variant="light">?</Button>
        </Row>
      </Col>
    </Container>
  );
}

export default StoryPoints;
