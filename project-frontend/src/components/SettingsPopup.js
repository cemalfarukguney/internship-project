import React from 'react'
import { Form, CloseButton, Button } from 'react-bootstrap';
import {MdOutlineClose} from "react-icons/md"

function SettingsPopup(props) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup--div'>
        <h2>Game Settings</h2>
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
            <Form.Control type='text'></Form.Control>
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
          <Button variant='primary' type='submit' size='lg'>Submit</Button>
          </div>
        </Form>
        {/* <a className='popup--close-button' href="#" onClick={() => props.setTrigger(false)}>
          <MdOutlineClose/>
        </a> */}
        <CloseButton className='popup--close-button' onClick={() => props.setTrigger(false)}/>
        {props.children}
      </div>
    </div>
  ) :"";
}

export default SettingsPopup