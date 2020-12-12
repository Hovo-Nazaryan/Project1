import React, { PureComponent } from 'react';
import Tasks from './Tasks'
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from './addTasks';
import './ToDo.css'
import idGen from './idGen';
import Confirm from "./confirmModals"
import EditModal from './editModal'
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

class ToDo extends PureComponent {
    state = {
        editTask: null,
        tasks: [],
        selectedTasks: new Set(),
        toggle: false,
        
    }

    handleCheck = (taskId) => {
        console.log(taskId)
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId)

        } else {

            selectedTasks.add(taskId)
        }
        this.setState({
            selectedTasks
        })
        console.log(selectedTasks)
    }

    addTask = (value) => {

        const newTask = {
            text: value,
            _id: idGen()
        }
        const tasksArray = [newTask, ...this.state.tasks]


        this.setState({
            tasks: tasksArray,
        })
    }

    handleDelete = (taskId) => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId);
        console.log(taskId)
        this.setState({
            tasks: newTasks
        });
    }

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    
    toggleEditModal = (task) => {
        this.setState ({
            editTask: task
        })

    }

    saveTask = (editedTasks) => {
        const tasks = [...this.state.tasks]
        const foundTaskId = tasks.findIndex((task) => task._id === editedTasks._id)
        tasks[foundTaskId] = editedTasks

        this.setState ({
            tasks: tasks,
            editTask: null,
        })
    }
    

    removeSelected = () => {
        let tasks = [...this.state.tasks]

        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)

        })
        this.setState({
            tasks,
            selectedTasks: new Set(),
            toggle: false
        })
    }

    render() {
        const { tasks, toggle, selectedTasks, editTask } = this.state;
        const tasksArray = tasks.map((task) => {
            return (
                <Col className="colCard" key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Tasks
                        data={task}
                        onRemove={this.handleDelete}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                        onEdit = {() => this.toggleEditModal(task)}
                    />
                </Col>
            )
        })
        return (
            <div className='ToDo'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col sm={6} xl={6} lg={4} md={6}>
                            <AddTask
                                onAdd={this.addTask}
                                disabled={!!selectedTasks.size}
                            />
                        </Col>
                    </Row>
                </Container>
                <Row className="mb-3">
                    {tasksArray}
                </Row>
                <Button variant="outline-danger"
                    onClick={this.removeSelected}
                    onClick={this.toggleConfirm}
                    disabled={selectedTasks.size === 0 ? true : false}
                >
                    Remove Selected
                </Button>
                {toggle &&
                    <Confirm
                        onSubmit={this.removeSelected}
                        onClose={this.toggleConfirm}
                        count={selectedTasks.size}
                    />
                }
                {!!editTask &&
                    <EditModal
                        data = {editTask}
                        onSave = {this.saveTask}
                        onClose = {() => this.toggleEditModal(null)}
                    />
                }
            </div>
        )
    }
}

export default ToDo