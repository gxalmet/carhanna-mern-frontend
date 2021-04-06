import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { readScream } from '../actions/screamActions'
import SendSharpIcon from '@material-ui/icons/SendSharp';
import { Form, Button, Container, Card } from 'react-bootstrap';
//import { createScream } from '../actions/screamActions';
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
    const dispatch = useDispatch();
    const classes = useStyles();

    const scrollRef = useRef();

    const projectSelId = props.match.params.id;
    
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
            setContent(initialContent);
        }
        scrollToBottom();
    }
    

    useEffect(() => {
        
        scrollToBottom();
        
        if(loading === false){
            if(scream && projectSelId === scream.projectId._id){
                setScreamsList(scream);
            }
            if(scream && projectSelId !== scream.projectId._id){
                dispatch(readScream(projectSelId));
            }    
        }else{
            dispatch(readScream(projectSelId));
        } 

        // if(projectSelId){
        //     if(projectSelId !== screamsList.projectId){
        //         setScreamsList({});
        //         if(loading === true && !success){
        //             dispatch(readScream(projectSelId));
        //         }
                
        //     }
        //     if(loading === false){
        //         if(success === false){ 
        //             dispatch(readScream(projectSelId));
        //         }else{
        //             setScreamsList(scream);
        //         }   
        //     }else{
        //         //dispatch(readScream(projectSelId));
        //     }

        //     // if(!screamsList){
        //     //     dispatch(createScream(projectSelId)); 
        //     // } 
        //} 
    }, [dispatch, loading, scream, success, projectSelId, screamsList.projectId, screamsList])

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Container fluid>
            <Card >
                <Card.Body>
                    {screamsList.projectId &&
                        <Typography variant="h5" align="center" > 
                            {screamsList.projectId.name}
                        </Typography>
                    }
                    
                </Card.Body>
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
                        <SendSharpIcon/>
                    </Button>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default ScreamsScreen
