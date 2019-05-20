import React, { Component } from 'react';
import '../styles/MessageList.css';
import { MdFileDownload, MdDelete } from 'react-icons/md';
import { IconButton, Tooltip } from '@material-ui/core';
import { Reply, Place, Message } from '@material-ui/icons';
import { format } from 'date-fns';
import ThreadDialog from './ThreadDialog';
import Axios from 'axios';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            downloadHover: false,
            downloadStyleArray: [],
            deleteStyleArray: [],
            adminUser: false,
            messages: [],
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
            messages: this.props.messages
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messages !== nextProps.messages || !this.state.messages.length) this.scrollToBottom();
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
        const listSrc = this.props.messages.filter(d => this.state.input === '' || d.text.toLowerCase().includes(this.state.input.toLowerCase()) || format(new Date(d.createdAt), 'DD.MM.YYYY').includes(this.state.input));
        return (
            <div className="container">
            <input className="pretragaText" placeholder="Pretraži poruke po frazi ili po datumu u formatu DD.MM.YYYY" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
                <ul style={listStyle} className="list-group message-list">
                    {listSrc.map((message, index) => (
                        <li
                            className="list-group-item" style={messageStyle} key={index}>
                            <h4 className="message-sender" onClick={this.props.openPrivateChat}>{message.senderId}</h4>
                            <p style={messageTextStyle} className="message-text" >
                                {message.text}
                            </p>
                            <div className="actions">
                                <Tooltip title="Pinuj poruku">
                                    <IconButton color="primary" onClick={() => this.handlePinMessage(message)}
                                        style={{ float: 'right' }}>
                                        <Place />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Odgovori na poruku">
                                    <IconButton color="primary" onClick={() => this.replyToMessage(message)}
                                        style={{ float: 'right' }}>
                                        <Reply />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Pokreni thread">
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
                            <p className="timeDiv"> {format(new Date(message.createdAt), 'DD.MM.YYYY. - HH:mm')} </p>
                            {
                                message.text.substr(0, 16) === 'Downloaduj file:' ?
                                    <div style={wrapperStyle}>
                                        <div style={{ flex: 1 }}>
                                            <MdFileDownload size='2em' onClick={() => { this.handleDownloadClick(message) }} style={downloadStyle}
                                                onMouseEnter={() => this.downloadHover(index)} onMouseLeave={() => this.downloadHover(index)} />

                                            <div className="text-primary" style={this.state.downloadStyleArray[index] ? hintVisible : hintHidden}>
                                                Download file
                                        </div>
                                        </div>

                                        {
                                            message.senderId === this.props.currentId || this.state.adminUser ?
                                                <div style={{ flex: 1, alignItems: 'right' }}>
                                                    <div style={{ float: "right" }}>
                                                        <MdDelete size='2em' onClick={() => { this.handleDeleteClick(message, index) }} style={deleteStyle}
                                                            onMouseEnter={() => this.deleteHover(index)} onMouseLeave={() => this.deleteHover(index)} />

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
