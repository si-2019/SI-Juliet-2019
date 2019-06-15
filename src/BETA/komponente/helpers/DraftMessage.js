import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'

const DraftMessage = (props) => {
    return props.messages.map((message, index) => {

        var date = new Date(message.datum);

        return (
            <ListGroup.Item key={index}>
                <ListGroup.Item>
                    <div className="row">
                        <div className="col-1">id:{message.id}</div>
                        <div className="col-11">Datum i vrijeme: {date.toLocaleString()}</div>
                    </div>
                </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-11">{message.tekst}</div>
                        </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="issue-message">
                        <Button variant="primary" type='submit' className="message-button">Uredi</Button>
                        <Button variant="primary" type='submit' className="message-button">Pošalji</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup.Item>

        );
    })

};

export default DraftMessage;