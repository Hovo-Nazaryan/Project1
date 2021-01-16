import React, { PureComponent } from 'react';
import Tasks from './Tasks'
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from './addTasks';
import './ToDo.css'
import Confirm from "./confirmModals"
import EditModal from './editModal'

class ToDo extends PureComponent {
    state = {
        editTask: null,
        tasks: [],
        selectedTasks: new Set(),
        toggle: false,
        openTaskModal: false,

    }

    componentDidMount() {
        fetch("http://localhost:3001/task", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                this.setState({
                    tasks: response.reverse()
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleCheck = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId)

        } else {

            selectedTasks.add(taskId)
        }
        this.setState({
            selectedTasks
        })
    }

    addTask = (data) => {
        const body = JSON.stringify(data)
        fetch("http://localhost:3001/task", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                const tasks = [response, ...this.state.tasks]

                this.setState({
                    tasks: tasks,
                    openTaskModal: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleDelete = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                const newTasks = this.state.tasks.filter(task => task._id !== taskId);
                this.setState({
                    tasks: newTasks
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    toggleEditModal = (task) => {
        this.setState({
            editTask: task
        })

    }

    saveTask = (editedTasks) => {
        fetch(`http://localhost:3001/task/${editedTasks._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(editedTasks)
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                const tasks = [...this.state.tasks]
                const foundTaskId = tasks.findIndex((task) => task._id === editedTasks._id)
                tasks[foundTaskId] = editedTasks

                this.setState({
                    tasks: tasks,
                    editTask: null,
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }


    removeSelected = () => {
        let taskIds = { tasks: [...this.state.selectedTasks] }
        fetch(`http://localhost:3001/task`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(taskIds)
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                let tasks = [...this.state.tasks]

                this.state.selectedTasks.forEach((id) => {
                    tasks = tasks.filter((task) => task._id !== id)

                })
                this.setState({
                    tasks,
                    selectedTasks: new Set(),
                    toggle: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    toggleTaskModal = () => {
        this.setState({
            openTaskModal: !this.state.openTaskModal
        })
    }

    render() {
        const { tasks, toggle, selectedTasks, editTask, openTaskModal } = this.state;
        const tasksArray = tasks.map((task) => {
            return (
                <Col className="colCard" key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Tasks
                        data={task}
                        onRemove={this.handleDelete}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                        onEdit={() => this.toggleEditModal(task)}
                    />
                </Col>
            )
        })
        return (
            <div className='ToDo'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col sm={6} xl={2} lg={2} md={3}>
                            <Button
                                variant = "outline-success"
                                onClick = {this.toggleTaskModal}
                                disabled = {!!selectedTasks.size}
                            >
                                Add Task
                            </Button>
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
                        data={editTask}
                        onSave={this.saveTask}
                        onClose={() => this.toggleEditModal(null)}
                    />
                }
                {   openTaskModal &&
                    <AddTask
                        onAdd={this.addTask}
                        disabled={!!selectedTasks.size}
                        onClose = {this.toggleTaskModal}
                    />
                }
            </div>
        )
    }
}

export default ToDo