import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import {instanceLocator, testToken, roomId} from './../config.js'
import UsersList from './UsersList';
import '../styles/ChatApp.css'

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: { users: [] },
            messages: [],
            users: []
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })

                return currentUser.subscribeToRoom({
                    roomId: roomId,
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                        onPresenceChanged: () => this.forceUpdate(),
                        onUserJoinedRoom: () => this.forceUpdate(),
                        onUserLeftRoom: () => this.forceUpdate()     
                    }
                })
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom,
                    users: currentRoom.users
                })
            })
            .catch(error => console.log(error))
        }


    addMessage(text) {
        console.log(this.state);
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
            .catch(error => console.error('error', error));
    }

    render() {

        return (
            <div className="chat-app-wrapper">
                <div className="list-wrapper">
                    <h1>Users</h1>
                    <UsersList users={this.state.users}/>
                </div>
                <div className="msg-wrapper">
                    <h2 className="header">Let's Talk</h2>
                    <MessageList messages={this.state.messages} />
                    <Input className="input-field" onSubmit={this.addMessage} />
                </div>
            </div>
        )
    }
}

export default ChatApp;