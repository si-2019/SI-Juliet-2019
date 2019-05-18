import React, { Component } from 'react';
import '../styles/MessageList.css';
import { MdFileDownload, MdDelete } from 'react-icons/md'
import { format } from 'date-fns'

class MessageList extends Component {
    constructor(props){
        super(props);

        this.state = {
            downloadHover: false,
            downloadStyleArray: [],
            deleteStyleArray: [],
            adminUser: false,
            messages: []
        }

        props.messages.forEach(function(value){
            this.downloadStyleArray.push(false);
            this.deleteStyleArray.push(false);
        })

        console.log(props.currentId);

        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.downloadHover = this.downloadHover.bind(this);
        this.deleteHover = this.deleteHover.bind(this);
        this.handlePinMessage = this.handlePinMessage.bind(this);
    }

    handlePinMessage (message) {
        this.props.pinMessage(message);
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentWillMount(){
        if(this.props.currentId === 'admin@admin')
            this.setState({
                adminUser: true
            })
    }

    componentDidMount() {
        localStorage.clear();
        this.setState({
            messages: this.props.messages
        })
    } 

    componentWillReceiveProps(nextProps){
        if(this.props.messages !== nextProps.messages || !this.state.messages.length) this.scrollToBottom();
    }
        
    handleDownloadClick(message){
        this.props.downloadClick(
            message.text.substr(message.text.indexOf(':') + 2, message.text.length)
        )
    }

    handleDeleteClick(message, index){
        this.props.deleteClick(message, index);
    }

    downloadHover(index){
        let arrTmp = this.state.downloadStyleArray;
        arrTmp[index] = !arrTmp[index];

        this.setState({
            downloadStyleArray: arrTmp
        })

    }

    deleteHover(index){
        let listTmp = this.state.deleteStyleArray;
        listTmp[index] = !listTmp[index];

        this.setState({
            deleteStyleArray: listTmp
        })
    }

    render() {
        return (
            <div className="container">
                <ul style={listStyle} className="list-group message-list">
                    {this.props.messages.map((message, index) => (
                        <li className="list-group-item" style={messageStyle} key={index}>
                            <h4 className="message-sender" onClick={this.props.openPrivateChat}>{message.senderId}</h4>
                            
                            <p style={messageTextStyle} className="message-text" onClick={() => this.handlePinMessage(message)}>
                                {message.text}
                            </p>
                            <p> { format(new Date(message.createdAt), 'DD.MM.YYYY, HH:MM') } </p>
                            {
                                message.text.substr(0,16) === 'Downloaduj file:' ?
                                <div style={wrapperStyle}>
                                    <div style={{flex: 1}}>
                                        <MdFileDownload size='2em' onClick={() => {this.handleDownloadClick(message)}} style={downloadStyle}
                                            onMouseEnter={() => this.downloadHover(index)} onMouseLeave={() => this.downloadHover(index)} />

                                        <div className="text-primary" style={this.state.downloadStyleArray[index] ? hintVisible : hintHidden}>
                                            Download file
                                        </div>
                                    </div>

                                    {
                                        message.senderId === this.props.currentId || this.state.adminUser ? 
                                        <div style={{flex: 1, alignItems: 'right'}}>
                                            <div style={{float: "right"}}>
                                                <MdDelete size='2em' onClick={() => {this.handleDeleteClick(message, index)}} style={deleteStyle}
                                                    onMouseEnter={() => this.deleteHover(index)} onMouseLeave={() => this.deleteHover(index)}/>

                                                <div className="text-primary" style={this.state.deleteStyleArray[index] ? hintVisible : hintHidden}>
                                                    Delete file
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }
                        </li>                        
                        ))
                    }                    
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

const wrapperStyle = {
    display: 'flex',
    flexDirection: 'row'
}

const downloadStyle = {
    flex: 1,
    alignItems: 'center'
}

const deleteStyle = {
    flex: 1
}

const hintHidden = {
    flex: 1,
    visibility: 'hidden'
}

const hintVisible = {
    flex: 1,
    visibility: 'visible'
}

export default MessageList;
