import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import '../styles/ChatApp.css';
import RoomList from './RoomList';
import { instanceLocator, testToken, testRoomId, apiUrl, secretKey } from './../config.js'
import UsersList from './UsersList';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatApp.css';
import CreateRoom from './CreateRoom';
import UploadFile from './UploadFile';
import Axios from 'axios';
import Chatkit from '@pusher/chatkit-server';

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

const chatkit = new Chatkit({
    instanceLocator: instanceLocator,
    key: secretKey
  })

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            botUser: null,
            currentRoom: null,
            messages: [],
            users: [],
            rooms: [],
            typingUsers: [], 
            pinnedMessages: []
        }
        this.addMessage = this.addMessage.bind(this);
        this.openPrivateChat = this.openPrivateChat.bind(this);
        this.joinRoomById = this.joinRoomById.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.initRooms = this.initRooms.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.downloadClick = this.downloadClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.pinMessage = this.pinMessage.bind(this);
    }
    
    componentWillMount() {
        
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
        const url = 'http://localhost:31910/pinovanePoruke';
            //console.log(url);
        Axios.get(url).then(res => {
            console.log(res.data);
            this.setState({ 
                pinnedMessages: this.state.pinnedMessages.concat(res.data)
            }, () => {
                console.log(this.state.pinnedMessages);
                //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages));
            });
        }).catch(e => {console.log(e)});
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
                    if(message.text === 'DELETED'){
                        return;
                    }
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                onPresenceChanged: () => this.forceUpdate(),
                onUserJoinedRoom: () => this.forceUpdate(),
                onUserLeftRoom: () => this.forceUpdate(),
                onUserStartedTyping: user => {
                    console.log(user.name + ' poceo kucati....');
                    this.setState({
                      typingUsers: [...this.state.typingUsers, user.name],
                    })
                },
                onUserStoppedTyping: user => {
                    console.log(user.name + ' prestao kucati...');
                    this.setState({   
                        typingUsers: this.state.typingUsers.filter(
                            username => username !== user.name
                        ),
                    })
                },
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

    sendTypingEvent(event) {
        this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id }).catch(error => console.error('error', error))
    }

    uploadFile(file){
        const fData = new FormData();
        fData.append('file', new Blob([file], {type: file.type}));
        fData.append('name', file.name);
        fData.append('sender', this.state.currentUser.id);
        fData.append('room', this.state.currentRoom.id);

        console.log(fData);
        let config = {
            header : {
              'Content-Type' : 'multipart/form-data'
            }
        }

        Axios.post('http://localhost:31910/upload', fData, config).then(res => {
            window.alert('Uspješno upisano u bazu!');
            this.addMessage('Downloaduj file: ' + file.name);
            
            console.log(res);
        }).catch(() => window.alert('Greška...'));
    }

    downloadClick(name){
        const url = 'http://localhost:31910/download/' + name;
        console.log(url);

        Axios.get(url).then(res => {
            console.log(res);
            let resultByte = res.data.file.data;
            var bytes = new Uint8Array(resultByte);
            var blob = new Blob([bytes], {type: res.data.mimetype});

            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = res.data.naziv;
            link.click();
        }).catch(e => console.log(e));
    }

    deleteClick(message, index){
        Axios.post('http://localhost:31910/deleteMessage', {
            message_id: message.id
        })
        .then(res => console.log(res))
        .catch(e => console.log(e));

        let msgTmp = this.state.messages.slice(0, index).concat(this.state.messages.slice(index + 1, this.state.messages.length));

        this.setState({
            messages: msgTmp
        })
    }
    pinMessage(message) {
        const url = 'http://localhost:31910/pinovanePoruke/' + message.id;
        //console.log(url);
        Axios.get(url).then(res => {
            if (res.data == 0) { // ne postoji u bazi
                let trenutnaPoruka = {
                    messageCreatedAt: message.createdAt,
                    messageId: message.id + '',
                    roomId: message.roomId,
                    senderId: message.senderId,
                    text: message.text
                };
                this.setState({ 
                    pinnedMessages: this.state.pinnedMessages.concat([trenutnaPoruka])
                }, () => {
                    console.log(this.state.pinnedMessages);
                    //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages));
                    Axios.post('http://localhost:31910/pinujPoruku', {
                        messageCreatedAt: message.createdAt,
                        messageId: message.id + '',
                        roomId: message.roomId,
                        senderId: message.senderId,
                        text: message.text
                    })
                    .then(res => {})
                    .catch(e => console.log(e));
                });
                
            } 
            else { // postoji u bazi
                this.setState({
                    pinnedMessages: this.state.pinnedMessages.filter(function(m) { 
                        console.log(m.messageId + ' ?? ' + message.id);
                        return m.messageId != message.id;
                    }
                )}, () => { 
                    console.log(this.state.pinnedMessages); 
                    //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages)); 
                });
                const url2 = 'http://localhost:31910/pinujPoruku/' + message.id;
                Axios.delete(url2).then(res => {}).catch(e => {console.log(e)});
            } 
        });
        /*

        if(!this.state.pinnedMessages.includes(message)) {
            
            
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
        }    */
    }

    render() {
        return (
            <div className="chat-app-wrapper">
                <div className="room-wrapper">
                    <RoomList room={this.state.currentRoom} joinRoomById={this.joinRoomById} rooms={this.state.rooms} />
                    <CreateRoom createRoom={this.createRoom}/>
                    <div style={{
                        'overflow-y': 'scroll', 
                        'height': '250px'
                    }}>
                        <p> Pinovane poruke: </p>
                        <ul>
                        {this.state.pinnedMessages.filter(message => message.roomId == this.state.currentRoom.id).map(message => (
                            <div style={{
                                'border' : '1px solid white',
                            }}><li>{message.senderId + ' : ' + message.text}</li></div>
                        ))}
                        </ul>
                </div>
                </div>
                <div className="msg-wrapper">
                    <h2 className="header">Let's Talk</h2>
                    <MessageList currentId={this.props.currentId} 
                        messages={this.state.messages} pinMessage={this.pinMessage} downloadClick={this.downloadClick} deleteClick={this.deleteClick}/>
                    <TypingIndicator typingUsers={this.state.typingUsers} />
                    
                    <Input className="input-field" onSubmit={this.addMessage} onChange={this.sendTypingEvent}/>
                    <UploadFile onSubmit={this.uploadFile} />
                </div>
                <div className="list-wrapper">
                    <UsersList openPrivateChat={this.openPrivateChat} users={this.state.users} />
                </div>
            </div>
        )
    }
}

export default ChatApp;