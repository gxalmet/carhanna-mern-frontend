import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Container} from 'react-bootstrap';
import { convertDateCool } from '../utils/utils';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    message: {
        // borderLeft: '.2rem solid grey', 
        // borderRight: '.2rem solid grey',
        background: 'linear-gradient(45deg, white 0%, grey 90%)'
    },

}));
export default function ChatRow(props) {
    const mes = props.mes;
    const classes = useStyles();
    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;
    return (
        <Container  fluid style={{ padding:'.1rem' }}>
            <Container fluid xs={12} style={{ paddingLeft:'.5rem', textAlign:'left' }}>
                { userInfo._id === mes.authorUsername._id ? 
                ( 
                    <Typography variant="body1" align="left" > 
                        {mes.authorUsername.name} &nbsp;
                        {mes.authorUsername.surname} &nbsp;
                        says at &nbsp;
                        { mes.createdAt &&
                            convertDateCool(mes.createdAt)
                        } 
                    </Typography>
                ) : 
                (
                    <Typography variant="body1" align="right" > 
                        {mes.authorUsername.name} &nbsp;
                        {mes.authorUsername.surname} &nbsp;
                        says at &nbsp;
                        { mes.createdAt &&
                            convertDateCool(mes.createdAt)
                        }
                        
                    </Typography>
                )}
                
            </Container>
            <br></br>
            { userInfo._id === mes.authorUsername._id ? 
                ( 
                    <Grid item xs={12}  align="end" style={{ textAlign:'left'}} className={classes.message}>
                        <Typography variant="body2" align="left"  style={{ padding:'.5rem'}} > 
                        {mes.content}
                        </Typography>
                    </Grid>
                ) : (
                    <Grid item xs={12}  align="end" style={{ textAlign:'right'}} className={classes.message}>
                        <Typography variant="body2" align="right"  style={{ padding:'.5rem'}}> 
                            {mes.content}
                        </Typography>
                    </Grid>
                ) 
            }
            
        </Container>

    )
}

