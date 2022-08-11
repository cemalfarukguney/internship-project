import React from "react";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EnterName() {

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label aria-required>
                <h3>Enter Your Name</h3>
              </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EnterName;
