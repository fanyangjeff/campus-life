import React from 'react';
import {Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
function Spinning(props) {
    return (
        <div>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </div>
    );
}

export default Spinning;