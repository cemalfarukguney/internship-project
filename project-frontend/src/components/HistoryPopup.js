import React, { useContext, useState, useEffect } from "react";
import { Form, CloseButton, Table, Modal } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

let issues;
export function updateHistory(newIssues) {
  issues = newIssues;
}

function HistoryPopup(props) {
  const [issueState, setIssueState] = useState([]);
  const { updated, setUpdated } = useContext(UserContext)[2];

  useEffect(() => {
    setIssueState(issues);
  }, [updated]);

  return props.trigger ? (
    <Modal show={props.trigger} centered size="lg">
      <Modal.Header>
        <h2>Voting History</h2>
      </Modal.Header>
      <Modal.Body>
        <Form.Select className="narrow-select">
          <option>All Options</option>
        </Form.Select>
        <br></br>
        <Table striped bordered hover size>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Title</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {issueState?.map((issue) => {
              return (
                <tr>
                  <td>{issue.id}</td>
                  <td>{issue.issueName}</td>
                  <td>{issue.storyPoint}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {props.children}
      </Modal.Body>
      <CloseButton
        className="popup--close-button"
        onClick={() => props.setTrigger(false)}
      />
    </Modal>
  ) : (
    ""
  );
}

export default HistoryPopup;
