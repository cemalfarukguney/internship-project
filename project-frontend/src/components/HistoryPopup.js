import React, { useContext, useState, useEffect } from "react";
import { Form, CloseButton, Table, Modal } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

let issues;
export function updateHistory(newIssues) {
  issues = newIssues;
  console.log("ISSUES UPDATED");
}

function HistoryPopup(props) {
  const [issueState, setIssueState] = useState([]);
  const { updated, setUpdated } = useContext(UserContext)[2];

  let isMounted;
  useEffect(() => {
    if (isMounted) {
      setIssueState(issues);
      console.log("issue State UPDATED");
    }
  }, [updated]);
  return props.trigger ? (
    <Modal show={props.trigger} centered size="lg">
      {(isMounted = true)}
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
              <th>Name</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {issueState?.map((issue) => {
              <tr>
                <td>{issue.id}</td>
                <td>{issue.issueName}</td>
                <td>{issue.storyPoint}</td>
              </tr>;
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
