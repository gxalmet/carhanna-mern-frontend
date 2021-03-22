import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
    return (
        <Alert key={props.id} variant={props.variant}>
            {props.mes}
        </Alert>
    );
}
