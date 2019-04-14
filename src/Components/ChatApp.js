import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import {instanceLocator, testToken, roomId} from './../config.js'
import UsersList from './UsersList';
import '../styles/ChatApp.css'

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
            boUser: null,
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