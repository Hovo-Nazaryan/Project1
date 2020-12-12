import React, { Component } from 'react'
import { InputGroup, FormControl, Button} from 'react-bootstrap'

export default class AddTask extends Component {
    state = {
        inputValue: '',
    }
    
    addTask = () => {
        const {inputValue} = this.state
        if (!inputValue){
            return 
        }
        this.props.onAdd(inputValue)
        this.setState({
            inputValue: '',
        });
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            this.addTask()
        }
    }

    render() {
        const {inputValue} = this.state
        
        return (
            <InputGroup className='justify-content-center'>
                <FormControl
                    placeholder="Add new task"
                    onChange={this.handleChange}
                    value={inputValue}
                    onKeyDown={(event) => this.handleKeyDown(event)} />
                <InputGroup.Append>
                    <Button variant="outline-success"
                        onClick={this.addTask}
                        >Add Task
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}