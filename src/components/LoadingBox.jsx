import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function LoadingBox(props) {
    return (
        <Alert key={props.id} variant="success">
            {props.mes}
        </Alert>
    );
}

