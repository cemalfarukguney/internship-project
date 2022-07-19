import React from "react";
import {Button, Card, Container} from "react-bootstrap";

function TaskCard() {
  return (
    <Container className="w-100 p-2">
      <Card>
        <Card.Header>PP - 1</Card.Header>
        <Card.Body>
          <Card.Title>TaskName</Card.Title>
          <Card.Text>Task Explanation</Card.Text>
          <Button variant="primary">Vote this issue</Button>
          <Button variant="dark" className="float-end">8</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TaskCard;
