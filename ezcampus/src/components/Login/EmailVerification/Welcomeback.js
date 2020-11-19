import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Welcomeback.css'
import {Form} from "react-bootstrap";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import logo from '../Logo/Logo.jpeg'
function Welcomeback(props) {
    return (
        <div className={"popup_email_li"}>
            <div className={"Hero_email_li"}>
                <Form className={"center-mail-box-li-welcome"} >
                    <Card style={{ width: '350px',borderRadius:'15px' }}>
                        <Card.Img style={{height:"250px",borderRadius:"15px"}} variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Welcome back</Card.Title>
                            <Button variant="primary" onClick={props.close}>Go Log in</Button>
                        </Card.Body>
                    </Card>
                </Form>
            </div>
        </div>
    );
}

export default Welcomeback;