import React, {Component} from 'react';
import {Button, Card } from 'react-bootstrap'
import {faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ToDo.css'

class Tasks extends Component{
    state = {
        checked: false,
        disabled: false,
    }
    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        })
        const  {onCheck, data} = this.props
        onCheck(data._id)
        
    }
    render (){
        const task = this.props.data;
        const {checked} =this.state;
        const {disabled} = this.props;
        
        return (
            <Card className = {checked ? 'task1': 'task'}>
                <Card.Body>
                    <input 
                    type = 'checkbox' 
                    onClick ={this.handleCheck}
                    />
                    <Card.Title>{task.text.slice(0, 10)+'...'}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    <Button 
                    variant="danger" 
                    onClick = {() => this.props.onRemove(task._id)}
                    disabled = {disabled}
                    >
                        <FontAwesomeIcon icon = {faTrash}/>
                    </Button>
                    <Button
                        variant =  'primary'
                        onClick = {() => this.props.onEdit(task)}
                        disabled = {disabled}
                    >
                        <FontAwesomeIcon icon ={faEdit}/>
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Tasks