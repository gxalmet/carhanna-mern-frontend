import React from 'react';
//import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import { 
//    Form, 
    Col, 
//    Button, 
    Card, 
    Row, 
    Container 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import ListIcon from '@material-ui/icons/List';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import ChatIcon from '@material-ui/icons/Chat';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useSelector } from 'react-redux';

export default function HomeScreen() {

    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;

    return (
        <Container fluid>
            <Container xs={12}>
                <Row>
                    <Col style={{padding: "2rem"}}>
                        <Card >
                            <Card.Body>
                                <CreateNewFolderIcon />
                                <Card.Title>Create projects</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Create projects</Card.Subtitle>
                                <Card.Text>
                                    Create your projects and managed your team...
                                    {userInfo ? (<Link to='/createproject'> here</Link> ) : (<Link to='/register'> here</Link> )}
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  style={{padding: "2rem"}}>                    
                        <Card >
                            <Card.Body>
                                <ViewAgendaIcon />
                                <Card.Title>Agenda</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Create projects</Card.Subtitle>
                                <Card.Text>
                                    Check your agenda in order to show your day targets ...
                                    {userInfo ? (<Link to='/agenda'> here</Link> ) : (<Link to='/register'> here</Link> )}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col style={{padding: "2rem"}}>                     
                        <Card >
                            <Card.Body>
                                <CalendarViewDayIcon />
                                <Card.Title>Calendar</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Create projects</Card.Subtitle>
                                <Card.Text>
                                    Check the calendar to manage your projects ...
                                    {userInfo ? (<Link to='/calendar'> here</Link>) : (<Link to='/register'> here</Link> )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>  
                    <Col style={{padding: "2rem"}}>                     
                        <Card >
                            <Card.Body>
                                <ChatIcon />
                                <Card.Title>Chat</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Chat of your projects</Card.Subtitle>
                                <Card.Text>
                                    Chat with your collegues and build your projects...
                                    {userInfo ? (<Link to='/chat'> here</Link>) : (<Link to='/register'> here</Link> )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>  
                </Row>
                <Row>

                </Row>
            </Container>
        </Container>
    );
};
