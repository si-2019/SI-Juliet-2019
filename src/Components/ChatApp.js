import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import '../styles/ChatApp.css';
import RoomList from './RoomList';
import { instanceLocator, testToken, testRoomId, apiUrl } from './../config.js'
import UsersList from './UsersList';
import '../styles/ChatApp.css';
import CreateRoom from './CreateRoom';

let predmeti = require('../predmeti.json');
function findPredmetId(nameOfPredmet) {
    for(var i = 0; i < Object.keys(predmeti).length; i++) {
        for(var j = 0; j < Object.keys(predmeti[i].name).length; j++) {
            if(predmeti[i].name[j].toLowerCase() === nameOfPredmet.toLowerCase()) {
                return predmeti[i].id;   
            }
        }
    }
    return -1; 
}

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            botUser: null,
            currentRoom: null,
            messages: [],
            users: [],
            rooms: []
        }
        this.addMessage = this.addMessage.bind(this);
        this.openPrivateChat = this.openPrivateChat.bind(this);
        this.joinRoomById = this.joinRoomById.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.initRooms = this.initRooms.bind(this);
    }
    
    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })
        const chatManagerBot = new ChatManager({
            instanceLocator: instanceLocator,
            userId: "bot@autoreply",
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })
        
        chatManagerBot.connect().then(currentUser => {
            this.setState({botUser: currentUser})
            console.log(currentUser);
            return currentUser;
        })
        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })
            })
            .then(() => {
                this.initRooms();
            })
            .then(() => {
                this.joinRoomById(testRoomId);
            })
    }

    initRooms() {
        this.state.currentUser.rooms.forEach(userRoom => {
            this.state.currentUser.subscribeToRoom({
                roomId: userRoom.id
            }).then(() => {
                if (userRoom.name === this.state.currentUser.id && userRoom.users.length > 1) {
                    this.state.currentUser.updateRoom({
                        roomId: userRoom.id,
                        name: this.state.currentUser.id === userRoom.users[0].id ? userRoom.users[1].id : userRoom.users[0].id
                    })
                }

            })
        })
        this.setState({ rooms: this.state.currentUser.rooms });
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
        console.log(this.state);
        this.state.currentUser.sendMessage({
            text: text,
            roomId: this.state.currentRoom.id
        }).then(() => {
            if(text.substr(0, 11) === "@izvjestaj ") {
                var name = text.substr(11);
                var predmetGodina = name.split(", ");
                var predmetId = findPredmetId(predmetGodina[0]);
                if (predmetId != -1) {
                    this.state.botUser.sendMessage({
                        text: "https://zamger.etf.unsa.ba/?sta=izvjestaj/predmet&predmet=" + predmetId + "&ag=" + 
                        (parseInt(predmetGodina[1]) - 2005) + "&sm_arhiva=0",
                        roomId: this.state.currentRoom.id
                    })
                } else {
                    this.state.botUser.sendMessage({
                        text: "Nepostojeci predmet",
                        roomId: this.state.currentRoom.id
                    })
                }
            }
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