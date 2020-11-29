import React, {Component} from 'react';
import Tasks from './Tasks'
import {Container, Row, Col} from 'react-bootstrap';
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import {ListGroup, ListGroupItem} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ToDo.css'

class ToDo extends Component{
    state = {
        tasks : [],
        inputValue : ' ',
    }


    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    addTask = () =>{
        const {inputValue} = this.state;
        const newTasks = [...this.state.tasks]

        newTasks.push(inputValue)

        this.setState({
            tasks: newTasks,
            inputValue: '',
        })
    }

    render() {
        const {inputValue, tasks} = this.state;
        return(
            <div className = 'block'>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <InputGroup className="mb-3" placeholder = 'Add new task '>
                                <FormControl
                                    placeholder="Add new task"
                                    onChange = {this.handleChange}
                                    value = {inputValue}/>
                            </InputGroup>
                        </Col>
                        <Col sm={4}>
                            <>
                                <Button variant="outline-success" onClick = {this.addTask}>Add Task</Button>{' '}
                            </>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <ListGroup className="mb-3" >
                                {
                                tasks.map((task ) => {
                                    return <Tasks data = {task}/>
                                })
                            }
                                
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}

export default ToDo