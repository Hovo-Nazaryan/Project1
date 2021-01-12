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
            title: event.target.value,
        })
    }

    handlSave = () => {
        const {title} = this.state;

        if(!title){
            return
        }
        this.props.onSave(this.state)
    }
    render() {
        const {title} = this.state
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
                        value = {title}
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