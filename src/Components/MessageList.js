import React, { Component } from 'react';
import '../styles/MessageList.css';

class MessageList extends Component {
    constructor(props){
        super(props);

        this.handleDownloadClick = this.handleDownloadClick.bind(this);
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    } 
    
    handleDownloadClick(message){
        this.props.downloadClick(
            message.text.substr(message.text.indexOf(':') + 2, message.text.length)
        )
    }

    render() {
        return (
            <div className="container">
                <ul style={listStyle} className="list-group message-list">
                    {this.props.messages.map((message, index) => (
                        <li className="list-group-item" style={messageStyle} key={index}>
                            <h4 className="message-sender" onClick={this.props.openPrivateChat}>{message.senderId}</h4>
                            <p style={messageTextStyle} className="message-text">{message.text}</p>
                            {
                                message.text.substr(0,16) === 'Downloaduj file:' ?
                                <button className="btn btn-link" onClick={() => {this.handleDownloadClick(message)}}>Download</button> :
                                null
                            }
                        </li>
                    ))}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
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

const dwnStyle = {
    borderRadius: 5,
    color: 'red'
}
export default MessageList;
