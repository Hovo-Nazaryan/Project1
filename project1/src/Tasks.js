import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import{ListGroup, ListGroupItem} from 'react-bootstrap'

function Tasks(props) {
    return(
        <Container> 
            <Row>
                <Col cm = {8}>
                    <ListGroup>
                        <ListGroup.Item>{props.data}</ListGroup.Item>
                    </ListGroup>                
                </Col>
            </Row>
        </Container>
    )
}

export default Tasks