import React from 'react';
import { Button, Modal } from 'react-bootstrap'



export default function Confirm(props) {

  return (
    <>
      <Modal show={true} onHide={props.onClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure, remove {props.count} tasks</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onSubmit}>
            Submit
              </Button>
          <Button variant="primary" onClick={props.onClose}>
            Cancel
              </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}