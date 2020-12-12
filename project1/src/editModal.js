import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import "./ToDo.css"



export default class EditModal extends React.Component {
    constructor(props){
        super (props)

        this.state ={
            ...props.data
        }
    }
    handleChange = (event) => {
        this.setState({
            text: event.target.value,
        })
    }

    handlSave = () => {
        const {text} = this.state;

        if(!text){
            return
        }
        this.props.onSave(this.state)
    }
    render() {
        const {text} = this.state
        const { props } = this;
        return (
            <>
                <Modal show={true} onHide={props.onClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure, edit task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type='text' 
                        className = 'input'
                        value = {text}
                        onChange = {this.handleChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handlSave}>
                            Save
                        </Button>
                        <Button variant="danger" onClick={props.onClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}