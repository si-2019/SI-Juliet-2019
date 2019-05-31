import React, { Component } from 'react';
import '../styles/MessageList.css';
import { IconButton, Tooltip } from '@material-ui/core';
import { Reply, Place, Message, CloudDownload, Delete, SlowMotionVideo, SlowMotionVideoOutlined } from '@material-ui/icons';
import { format } from 'date-fns';
import ThreadDialog from './ThreadDialog';
import Message_ from './Message_'
import Axios from 'axios';
import { thisTypeAnnotation } from 'babel-types';

function RoomName(props) {
    console.log(typeof props.currentRoom.name)
    if(!props.currentRoom.name) return '';
    if (!props.currentRoom.isPrivate)
        return "#" + props.currentRoom.name;
    return props.currentRoom.name;
}

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            downloadHover: false,
            downloadStyleArray: [],
            deleteStyleArray: [],
            adminUser: false,
            messages: [],
            users: [],
            avatars: [],
            openThread: false,
            selectedMessage: {},
            threadMessages: [], 
            input: ''
        }

        props.messages.forEach(function (value) {
            this.downloadStyleArray.push(false);
            this.deleteStyleArray.push(false);
        });

        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.downloadHover = this.downloadHover.bind(this);
        this.deleteHover = this.deleteHover.bind(this);
        this.handlePinMessage = this.handlePinMessage.bind(this);
        this.replyToMessage = this.replyToMessage.bind(this);
    }

    handlePinMessage(message) {
        this.props.pinMessage(message);
    }

    replyToMessage(message) {
        this.props.replyToMessage(message);
    }

    handleDialogOpen = (message) => {
        Axios.post(`http://localhost:31910/thread`, { messageId: message.id })
            .then(() => {
                this.setState({ threadMessages: [] });
                this.getThreadMessages(message);
            }).catch(err => {
                if (err.response.status === 400) {
                    this.setState({ threadMessages: [] });
                    this.getThreadMessages(message);
                }
            })
    }

    handleDialogClose = () => {
        this.setState({ openThread: false });
    }

    getThreadMessages = (message) => {
        Axios.get(`http://localhost:31910/thread/${message.id}`)
            .then(res => {
                this.setState({ openThread: true, selectedMessage: message, threadMessages: res.data });
            }).catch(err => {
                console.error(err);
            });
    }

    addThreadMessage = (message) => {
        Axios.put(`http://localhost:31910/thread/${this.state.selectedMessage.id}`, {
            sender: this.props.currentId,
            text: message
        }).then(res => {
            let newMessage = {
                sender: res.data.sender,
                text: res.data.text,
                threadId: res.data.threadId
            }
            this.setState({ threadMessages: [...this.state.threadMessages, newMessage ]});
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentWillMount() {
        if (this.props.currentId === 'admin@admin')
            this.setState({
                adminUser: true
            })
    }

    componentDidMount() {
        localStorage.clear();
        
        this.setState({
            messages: this.props.messages,
            users: this.props.users
        })

    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleDownloadClick(message) {
        this.props.downloadClick(
            message.text.substr(message.text.indexOf(':') + 2, message.text.length)
        )
    }

    handleDeleteClick(message, index) {
        this.props.deleteClick(message, index);
    }

    downloadHover(index) {
        let arrTmp = this.state.downloadStyleArray;
        arrTmp[index] = !arrTmp[index];

        this.setState({
            downloadStyleArray: arrTmp
        })

    }

    deleteHover(index) {
        let listTmp = this.state.deleteStyleArray;
        listTmp[index] = !listTmp[index];

        this.setState({
            deleteStyleArray: listTmp
        })
    }
    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
      }

    render() {
        console.log(this.props.users.length);
        console.log(this.props.messages.length);
        const listSrc = this.props.messages.filter(d => this.state.input === '' || d.text.toLowerCase().includes(this.state.input.toLowerCase()) || format(new Date(d.createdAt), 'DD.MM.YYYY').includes(this.state.input));
        return (
            <div className="container">
                <div className="message-header">
                    <div className="nameOfRoom">
                        <h4>
                            <RoomName currentRoom={this.props.currentRoom}/>
                        </h4>
                    </div>
                    <input className="pretragaText" placeholder="Pretraži poruke po frazi ili po datumu u formatu DD.MM.YYYY" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <ul style={listStyle} className="list-group message-list">
                    {listSrc.map((message, index) => (
                        <li className="list-group-item hover-message" style={messageStyle} key={index}>
                            <Message_
                                openPrivateChat={this.props.openPrivateChat}
                                text={message.text}
                                user={this.props.users.filter(d => d.id === message.senderId)[0]}
                                date={message.createdAt}
                            />
                            <div className="actions">
                                {
                                    message.text.substr(0, 16) === 'Downloaduj file:' ?
                                    <div>
                                        <Tooltip title="Download file">
                                            <IconButton color="primary" onClick={() => this.handleDownloadClick(message)}
                                                style={{ float: 'right' }}>
                                                <CloudDownload />
                                            </IconButton>
                                        </Tooltip>
                                        {
                                            message.senderId === this.props.currentId || this.state.adminUser ?
                                            <Tooltip title="Delete file">
                                                <IconButton color="primary" onClick={() => this.handleDeleteClick(message, index)}
                                                    style={{ float: 'right' }}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                            : null
                                        }
                                    </div>
                                    : null
                                }

                                <Tooltip title="Pin message">
                                    <IconButton color="primary" onClick={() => this.handlePinMessage(message)}
                                        style={{ float: 'right' }}>
                                        <Place />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Reply">
                                    <IconButton color="primary" onClick={() => this.replyToMessage(message)}
                                        style={{ float: 'right' }}>
                                        <Reply />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Start thread">
                                    <IconButton color="primary" onClick={() => this.handleDialogOpen(message)}
                                        style={{ float: 'right' }}>
                                        <Message />
                                    </IconButton>
                                </Tooltip>

                                <ThreadDialog
                                    open={this.state.openThread}
                                    onClose={this.handleDialogClose}
                                    onSubmit={this.addThreadMessage}
                                    message={this.state.selectedMessage}
                                    messagelist={this.state.threadMessages}
                                    current={this.props.currentId}
                                />
                            </div>
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


const listStyle = {
    height: 'calc(100% - 65px)',
    textAlign: 'left'
}

const messageStyle = {
    alignContent: 'center',
    border: 'none',
    paddingLeft: '2rem'
}

const imgStyle = {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: '1px solid black',
    marginTop:'6px'
}

export default MessageList;
