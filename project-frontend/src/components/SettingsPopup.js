import React, {useContext, useRef} from 'react'
import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
import { UserContext } from '../UserContext';

function SettingsPopup(props) {
  const roomNameRef = useRef(null);
  const {roomName, setRoomName} = useContext(UserContext)[1];

  function handleSubmit(){
    setRoomName(roomNameRef.current.value);
    props.setTrigger(false);
  }

  return (props.trigger) ? (
    <Modal show={props.trigger} centered size='lg'>
      <Modal.Header>
        <h2>Game Settings</h2>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Game Facilitator</Form.Label>
            <Form.Select>
              <option>Option1</option>
              <option>Option2</option>
              <option>Option3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Game's Name</Form.Label>
            <Form.Control ref={roomNameRef} type='text' defaultValue={roomName}></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Voting System</Form.Label>
            <Form.Select>
              <option>Option1</option>
              <option>Option2</option>
              <option>Option3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Who Can Reveal Cards</Form.Label>
            <Form.Select>
              <option>Option1</option>
              <option>Option2</option>
              <option>Option3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Who Can Manage Issues</Form.Label>
            <Form.Select>
              <option>Option1</option>
              <option>Option2</option>
              <option>Option3</option>
            </Form.Select>
          </Form.Group>
          <div className='d-grid gap-2'>
          <Button variant='primary' type='submit' size='lg' onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>
      </Modal.Body> 
        {/* <a className='popup--close-button' href="#" onClick={() => props.setTrigger(false)}>
          <MdOutlineClose/>
        </a> */}
        <CloseButton className='popup--close-button' onClick={() => props.setTrigger(false)}/>
        {props.children}
    </Modal>
  ) :"";
}

export default SettingsPopup