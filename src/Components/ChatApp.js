import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import { instanceLocator, testToken, testRoomId, apiUrl } from './../config.js'
import UsersList from './UsersList';
import RoomList from './RoomList';
import '../styles/ChatApp.css';
import CreateRoom from './CreateRoom';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: null,
            messages: [],
            users: [],
            rooms: []
        }
        this.addMessage = this.addMessage.bind(this);
        this.openPrivateChat = this.openPrivateChat.bind(this);
        this.joinRoomById = this.joinRoomById.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }
    
    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })
        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })
            })
            .then(() => {
                this.setState({ rooms: this.state.currentUser.rooms })
            })
            .then(() => {
                this.joinRoomById(testRoomId);
            })
    }

    joinRoomById(roomId) {
        this.setState({ messages: [] });
        this.state.currentUser.subscribeToRoom({
            roomId: roomId,
            messageLimit: 100,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                onPresenceChanged: () => this.forceUpdate(),
                onUserJoinedRoom: () => this.forceUpdate(),
                onUserLeftRoom: () => this.forceUpdate()
            }
        }).then((room) => {
            this.setState({
                currentRoom: room,
                users: room.users,
            })
        })
    }

    openPrivateChat(userId) {
        this.setState({ messages: [] });
        const room = this.state.rooms.filter(room => room.name === userId);
        if (room.length > 0) {
            this.joinRoomById(room[0].id);
        } else {
            this.state.currentUser.createRoom({
                name: userId,
                private: true,
                addUserIds: [userId]
            }).then((room) => {
                this.setState({ rooms: [...this.state.rooms, room] });
                this.joinRoomById(room.id);
            });
        }
    }

    addMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        }).catch(error => console.error('error', error));
    }
    createRoom(roomName){
        this.state.currentUser.createRoom({
            name: roomName,
            private: true
        }).then(room => {
            this.setState({ rooms: [...this.state.rooms, room] });
            this.joinRoomById(room.id);
        })
        .catch(err=> console.log("err wth cr room", err))
    }

    render() {
        return (
            <div className="chat-app-wrapper">
                <div className="room-wrapper">
                    <RoomList room={this.state.currentRoom} joinRoomById={this.joinRoomById} rooms={this.state.rooms} />
                    <CreateRoom createRoom={this.createRoom}/>
                </div>
                <div className="msg-wrapper">
                    <h2 className="header">Let's Talk</h2>
                    <MessageList messages={this.state.messages} />
                    <Input className="input-field" onSubmit={this.addMessage} />
                </div>
                <div className="list-wrapper">
                    <UsersList openPrivateChat={this.openPrivateChat} users={this.state.users} />
                </div>
                
            </div>
        )
    }
}

export default ChatApp;