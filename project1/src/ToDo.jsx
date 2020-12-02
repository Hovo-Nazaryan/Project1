import React, { Component } from 'react';
import Tasks from './Tasks'
import { Container, Row, Col } from 'react-bootstrap';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap'
import './ToDo.css'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import idGen from './idGen';

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
    }


    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    addTask = () => {
        const { inputValue } = this.state;
        if(!inputValue){
            return
        }
        const newTask = {
            text: inputValue,
            _id: idGen() 
        }
        const tasksArray = [newTask, ...this.state.tasks]
        

        this.setState({
            tasks: tasksArray,
            inputValue: '',
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            this.addTask()
        }
    }
    handleDelete = (taskId) => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: newTasks
        });
    }

    render() {
        const { inputValue} = this.state;
        const tasksArray = this.state.tasks.map((task, i)=>{
            return(
                <Col key = {i} xs={12} sm={6} md={4} lg={3} xl={2} className ="mb-3">
                <Card className ='task'>
                    <Card.Body>
                        <Card.Title>{task.text.slice(0, 10)+'...'}</Card.Title>
                        <Card.Text>
                            {task.text}
                        </Card.Text>
                        <Button variant="danger" onClick = {() => this.handleDelete(task._id)}>
                            <FontAwesomeIcon icon = {faTrash}/>
                        </Button>
                    </Card.Body>
                </Card>
                </Col>
            )
        })
        return (
            <div className='ToDo'>
                <Container>
                    <Row className = 'justify-content-center'>
                        <Col sm={6} xl={6} lg={4} md={6}>
                            <InputGroup className= 'justify-content-center'>
                                <FormControl
                                    placeholder="Add new task"
                                    onChange={this.handleChange}
                                    value={inputValue}
                                    onKeyDown = {(event) => this.handleKeyDown(event)} />
                                <InputGroup.Append>
                                    <Button variant="outline-success" 
                                        onClick={this.addTask}
                                        disabled = {!inputValue}>Add Task
                                        </Button>
                                </InputGroup.Append> 
                            </InputGroup> 
                        </Col>     
                    </Row>
                </Container>
                <Row className = "mb-3">
                    {tasksArray}
                </Row>
            </div>
        )
    }
}

export default ToDo