import React from 'react'
import { Form, CloseButton, Button, Table, Modal } from 'react-bootstrap';

function HistoryPopup(props) {
    return (props.trigger) ? (
        <Modal show={props.trigger} centered size='lg'>
            <Modal.Header>
                <h2>Voting History</h2>
            </Modal.Header>
            <Modal.Body>
                <Form.Select className='narrow-select'>
                    <option>All Options</option>
                    <option>Option 2</option>
                </Form.Select>
                <br></br>
                <Table striped bordered hover size>
                    <thead>
                        <th>Issue</th>
                        <th>Result</th>
                        <th>Agreement</th>
                        <th>Duration</th>
                        <th>Players voted</th>
                        <th>Time</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Issue1</td>
                            <td>10</td>
                            <td>88%</td>
                            <td>02:00</td>
                            <td>3</td>
                            <td>{new Date().toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
                {props.children}
            </Modal.Body>
            <CloseButton className='popup--close-button' onClick={() => props.setTrigger(false)}/>
        </Modal>
      ) :"";
}

export default HistoryPopup