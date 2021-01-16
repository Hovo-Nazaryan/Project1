import React, { Component } from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ToDo.css";
import {formatDate} from './utils'

export default class AddTask extends Component {
    state = {
        title: '',
        description: '',
        date: new Date(),
    }

    addTask = () => {
        const { title, description, date } = this.state
        if (!title) {
            return
        }
        const task = {
            title,
            description,
            date: formatDate(date.toISOString())
            
        }
        this.props.onAdd(task)

    }

    handleChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask()
        }
    }
    handleDateChange = (date) => {
        this.setState({
            date
        })
    }

    render() {
        const { title, date } = this.state
        const { disabled, onClose } = this.props

        return (
            <>
                <Modal
                    show={true}
                    onHide={onClose}
                    animation={false}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add the Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            aria-describedby="basic-addon1"
                            onChange={(event) => this.handleChange(event, 'title')}
                            onKeyDown={(event) => this.handleKeyDown(event)}
                            disabled={disabled}
                        />
                        <textarea rows="5" className='textarea'
                            onChange={(event) => this.handleChange(event, 'description')}
                        />
                        <DatePicker
                            selected={date} 
                            onChange = {(date) => this.handleDateChange(date)} 
                        />
                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-primary"
                                onClick={this.addTask}
                                disabled={!title}
                            >
                                Add
                        </Button>
                            <Button variant="outline-danger"
                                onClick={onClose}
                            >
                                Cancel
                        </Button>
                        </Modal.Footer>
                </Modal>
            </>
        )
    }
}