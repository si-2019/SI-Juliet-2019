import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from "@material-ui/core";
import Axios from "axios";

function Transition(props) {
    return <Slide direction="up" {...props} />
}

export default class ThreadDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageToSend: ''
        };
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleChange = (e) => {
        this.setState({
            messageToSend: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.persist();
        this.props.onSubmit(this.state.messageToSend);
        this.setState({ messageToSend: '' });
    }

    render() {
        const { ...other } = this.props;
        return (
            <div>
                <Dialog
                    maxWidth="md"
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="thread-dialog-title"
                    {...other}
                >
                    <DialogTitle id="thread-dialog-title">Message #{this.props.message.id}</DialogTitle>
                    <DialogContent>
                        <ul style={listStyle} className="list-group message-list">
                            {this.props.messagelist.map((message, index) => (
                                <li
                                    className="list-group-item" style={messageStyle} key={index}>
                                    <h4 className="message-sender">{message.sender}</h4>
                                    <p style={messageTextStyle} className="message-text" >
                                        {message.text}
                                    </p>
                                </li>
                            ))}</ul>
                        <form onSubmit={this.handleSubmit}>
                            <input className="input-group mb-3 message-input" type="text" style={inputStyle}
                                placeholder="Write something..." onChange={this.handleChange} value={this.state.messageToSend} />
                            <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Send" />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const messageTextStyle = {
    color: 'black',
    border: "1px solid #7856AD",
    padding: '10px',
    width: 'auto'
}

const listStyle = {
    overflowX: 'hidden',
    height: '100%',
    textAlign: 'left'
}

const messageStyle = {
    alignContent: 'center'
}

const buttonStyle = {
    height: '40%',
    marginLeft: '10px'
}

const inputStyle = {
    width: '100%',
    padding: '0'
}