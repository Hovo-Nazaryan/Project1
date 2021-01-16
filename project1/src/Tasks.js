import React, {Component} from 'react';
import {Button, Card } from 'react-bootstrap'
import {faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ToDo.css'
import {formatDate} from './utils'

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
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        Description: {task.description}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(task.date)}
                    </Card.Text>
                    <Card.Text>
                        Created At: {formatDate(task.created_at)}
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