import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'

//import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { readScream } from '../actions/screamActions'

import { Form, Button } from 'react-bootstrap';

import { updateScream } from '../actions/screamActions'

import ChatRow from './ChatRow';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'column'
    },

  }));
function ScreamsScreen(props) {
    const scrollRef = useRef();
    const projectSel = props.projectSel;
    const dispatch = useDispatch();
    const classes = useStyles();
    const screamRead = useSelector(state => state.screamRead);
    const { loading, scream, success } = screamRead;
    const initialContent = '';
    const [content, setContent] = useState(initialContent)
    const [screamsList, setScreamsList] = useState({})

    function sendScream(e) {
        //e.preventDefault(); 
        
        if(content){
            dispatch(updateScream(screamsList._id,content));
            dispatch(readScream(projectSel._id));
            
            
            setContent('');
            // console.log(content);   
        }
        scrollToBottom();
    }

    useEffect(() => {
        scrollToBottom();
        if(projectSel._id){
            if(loading === false){
                if(success === false){ 
                    dispatch(readScream(projectSel._id));
                }else{
                    setScreamsList(scream);
                }   
            }else{
                dispatch(readScream(projectSel._id));
            }
            if(projectSel._id !== screamsList.projectId){
                dispatch(readScream(projectSel._id));
            } 
        } 
    }, [dispatch, loading, scream, success, projectSel, screamsList.projectId])

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        // <Grid className={classes.root}>
        //     <Grid container >
        //         <Grid item xs={12} style={{ padding:'1rem', height:'35rem', overflowY:'scroll'}} >
        //             {   screamsList &&
        //                 screamsList.messages &&
        //                 screamsList.messages.map((mes,i)=>{
        //                     return ( 
        //                     <React.Fragment key={i}>
        //                         <ChatRow key={i} mes={mes}> 
        //                         </ChatRow> <br></br> 
        //                     </React.Fragment> );
        //                 })
        //             }
        //             <div ref={scrollRef} />
        //         </Grid>
        //     </Grid>
        //     <Grid container>
        //         <Grid item xs={10} style={{ position: 'relative'}}>
        //             <Form.Group controlId="formBasicDes">
        //                 <Form.Control  as="textarea" rows={2} value={content} onChange={(e)=>setContent(e.target.value)}/>
        //             </Form.Group>
        //         </Grid>
        //         <Grid item xs={2} style={{ position: 'relative'}}>
        //             <Button variant="outline-secondary" onClick={(e)=>sendScream(e)}>
        //                 Send
        //             </Button>
        //         </Grid>
        //     </Grid>
        // </Grid>
        <Grid className={classes.root}>
        <Grid container >
            <Grid item xs={12} style={{ padding:'1rem', height:'35rem', overflowY:'scroll'}} >
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
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={10} style={{ position: 'relative'}}>
                <Form.Group controlId="formBasicDes">
                    <Form.Control  as="textarea" rows={2} value={content} onChange={(e)=>setContent(e.target.value)}/>
                </Form.Group>
            </Grid>
            <Grid item xs={2} style={{ position: 'relative'}}>
                <Button variant="outline-secondary" onClick={(e)=>sendScream(e)}>
                    Send
                </Button>
            </Grid>
        </Grid>
    </Grid>
    )
}

export default ScreamsScreen
