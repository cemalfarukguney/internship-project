import React from 'react'
import { Form, CloseButton, Button, Modal, Alert } from 'react-bootstrap';
import {useState } from 'react';

function InvitationPopup(props) {

    const [copySuccess, setCopySuccess] = useState('');

    return (props.trigger) ? (
        <Modal show={props.trigger} centered>
            <Modal.Header>
                <h2>Invite Colleagues</h2>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3'>
                    <Form.Label>Game's URL</Form.Label>
                    <Form.Control type='text' value={window.location.href}></Form.Control>
                </Form.Group>
                <div className='d-grid gap-2'>
                    <Button variant='primary' type='submit' size='lg' 
                    onClick={() => {navigator.clipboard.writeText(window.location.href); setCopySuccess('Copied!');}}>
                        Copy Invitation Link
                    </Button>
                </div> 
                {props.children}
            </Modal.Body>
            {copySuccess &&
            <Alert variant="primary">
                <p className='mb-0 text-center'>
                    Invitation Link Copied Successfully
                </p>
            </Alert>}
            <CloseButton className='popup--close-button' onClick={() => {props.setTrigger(false); setCopySuccess('');}}/>
        </Modal>
      ) :"";
}

export default InvitationPopup