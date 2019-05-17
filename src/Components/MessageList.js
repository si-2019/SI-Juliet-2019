import React, { Component } from 'react';
import '../styles/MessageList.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pinnedMessages: []
        }
    }

    pinMessage (message) {
        if(!this.state.pinnedMessages.includes(message)) {
            this.setState({ 
                pinnedMessages: this.state.pinnedMessages.concat([message])
            }, () => {
                console.log(this.state.pinnedMessages);
                //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages));
            });
            
            console.log("Pinnaj je");
            
        }
        else {  
            console.log("nemoj");
            this.setState({
                pinnedMessages: this.state.pinnedMessages.filter(function(m) { 
                    console.log(m.id + ' ?? ' + message.id);
                    return m != message || m.id != message.id
                }
            )}, () => { 
                console.log(this.state.pinnedMessages); 
                //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages)); 
            });
        }    
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        localStorage.clear();
        this.scrollToBottom();
        //var niz = localStorage.getItem('PinovanePoruke');
        //var novi = JSON.parse(niz);
        //this.setState({pinnedMessages: niz != null ? novi : []});
    }

    componentDidUpdate() {
        this.scrollToBottom();
    } 
    componentWillUnmount() {
        
    }
    

    render() {
        let messages = this.state.pinnedMessages;
        let roomId = -1;
        const allMessages = this.props.messages;
        if (allMessages.length != 0) roomId = allMessages[0].roomId;
        messages.filter(m => m.id == roomId); 
        return (
            <div className="container">
                <ul style={listStyle} className="list-group message-list">
                    {this.props.messages.map((message, index) => (
                        <li className="list-group-item" style={messageStyle} key={index} onClick={() => this.pinMessage(message, index)}>
                            <h4 className="message-sender" onClick={this.props.openPrivateChat}>{message.senderId}</h4>
                            <p style={messageTextStyle} className="message-text">{message.text}</p>
                        </li>
                    ))}
                    <li></li>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
                <div>
                    {messages.map(message => (
                        <div>{message.senderId + ' :  ' + message.text}</div>
                    ))}
                </div>
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
export default MessageList;
