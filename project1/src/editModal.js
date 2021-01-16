import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ToDo.css"
import {formatDate} from './utils'



export default class EditModal extends React.Component {
    constructor(props) {
        super(props)
        const {date} = props.data
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date ()
        }
    }
    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
        })
    }

    handlSave = () => {
        const { title, date } = this.state;

        if (!title) {
            return
        }
        this.props.onSave({...this.state, date: formatDate(date.toISOString())})
    }
    handleDateChange = (date) =>{
        this.setState({
            date
        })
    }

    render() {
        const { title, description, date } = this.state
        const { props } = this;
        return (
            <Modal
                show={true}
                onHide={props.onClose}
                animation={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you Sure, edit the Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        name = 'title'
                        value = {title}
                        aria-describedby="basic-addon1"
                        onChange={this.handleChange}
                        // disabled={disabled}
                    />
                    <textarea 
                        name = 'description'
                        value = {description}
                        rows="5" 
                        className='textarea'
                        onChange={this.handleChange}
                    />
                    <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                        onClick={this.handlSave}
                        disabled={!title}
                    >
                        Save
                </Button>
                    <Button variant="outline-danger"
                        onClick={props.onClose}
                    >
                        Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}