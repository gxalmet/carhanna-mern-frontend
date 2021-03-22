import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { readScream } from '../actions/screamActions'

import { Form, Button, Container, Card } from 'react-bootstrap';
import { createScream } from '../actions/screamActions';
import { updateScream } from '../actions/screamActions'
//import Typography from '@material-ui/core/Typography';
import ChatRow from '../components/ChatRow';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '75vh',
        overflowY:'scroll'
    },

}));
function ScreamsScreen(props) {
    const history = useHistory();
    const scrollRef = useRef();
    const projectSelId = props.match.params.id;
    const dispatch = useDispatch();
    const classes = useStyles();
    const screamRead = useSelector(state => state.screamRead);
    const { loading, scream, success } = screamRead;
    const initialContent = '';
    const [content, setContent] = useState(initialContent);
    const [screamsList, setScreamsList] = useState({});

    const backToChats = () => {
        var ref = '/chatdev';
        history.push(ref);  
    }

    function sendScream(e) {
        //e.preventDefault(); 
        
        if(content){
            dispatch(updateScream(screamsList._id,content));
            dispatch(readScream(projectSelId));
            
            
            setContent('');
            // console.log(content);   
        }
        scrollToBottom();
    }

    useEffect(() => {
        scrollToBottom();
        if(projectSelId){
            if(loading === false){
                if(success === false){ 
                    dispatch(readScream(projectSelId));
                }else{
                    setScreamsList(scream);
                }   
            }else{
                dispatch(readScream(projectSelId));
            }
            if(projectSelId !== screamsList.projectId){
                dispatch(readScream(projectSelId));
            }
            // console.log('success');
            // console.log(success);
            if(!screamsList){
                dispatch(createScream(projectSelId)); 
            } 
        } 
    }, [dispatch, loading, scream, success, projectSelId, screamsList.projectId, screamsList])

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Container fluid>
            <Card >
                <Typography variant="h5" align="center" > 
                    Proyecto
                </Typography>
            </Card>
            <Container fluid xs={12} >
                <Button variant="outline-secondary" block onClick={backToChats}>Back to chats</Button>
            </Container>
            <Container fluid xs={12} className={classes.root}>

                <Container fluid >
                
                    {   screamsList &&
                        screamsList.messages &&
                        screamsList.messages.map((mes,i)=>{
                            return ( 
                            <React.Fragment key={i}>
                                <ChatRow key={i} mes={mes}> 
                                </ChatRow> <br></br> 
                            </React.Fragment> );
                        })
                    }
                    <div ref={scrollRef} />
                </Container>
            </Container>
            <Grid container justify="center">
                <Grid item xs={10} style={{ position: 'relative'}}>
                    <Form.Group controlId="formBasicDes">
                        <Form.Control  as="textarea" rows={1} value={content} onChange={(e)=>setContent(e.target.value)}/>
                    </Form.Group>
                </Grid>
                <Grid item xs={2} style={{ position: 'relative'}}>
                    <Button variant="outline-secondary" onClick={(e)=>sendScream(e)} block>
                        Send
                    </Button>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default ScreamsScreen
