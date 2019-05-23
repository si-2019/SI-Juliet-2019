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
import AddUser from './AddUser';
import UploadFile from './UploadFile';
import Axios from 'axios';
import {SwatchesPicker} from 'react-color';
import { Droplet } from 'react-feather';
import FileSidebar from './FileSidebar';
import NewPublicRoomForm from './NewPublicRoomForm';

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
            currentRoom: {},
            messages: [],
            messageToSend: '',
            users: [],
            usersAvatars: new Map(),
            rooms: [],
            hasErrorAddUser: null,
            typingUsers: [], 
            pinnedMessages: [], 
            colorForUser: null, 
            showColorPicker: false,
            joinableRooms:[]
        }
        this.addMessage = this.addMessage.bind(this);
        this.openPrivateChat = this.openPrivateChat.bind(this);
        this.joinRoomById = this.joinRoomById.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.initRooms = this.initRooms.bind(this);
        this.addUser = this.addUser.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.downloadClick = this.downloadClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.pinMessage = this.pinMessage.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.toggleColorPicker = this.toggleColorPicker.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.createPublicRoom = this.createPublicRoom.bind(this);
    }
    toggleColorPicker() {
        this.setState({
            showColorPicker: !this.state.showColorPicker,
        });
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
            return currentUser;
        })
        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser }, () => { 
                    Axios.get('http://localhost:31910/colorscheme/' + this.state.currentUser.id).then(res => {
                        if (res.data == 0) { // korisnik nema svoj colorscheme
                            this.setState({
                                colorForUser: null
                            });
                        } else { 
                            Axios.get('http://localhost:31910/colorschemeUser/' + this.state.currentUser.id).then(res => {
                                this.setState({
                                    colorForUser: res.data.colorId
                                })
                            });
                        }
                    }) 
                    currentUser.getJoinableRooms()
                    .then(joinableRooms => {
                        this.setState({
                            joinableRooms
                        })
                    })
                })
                
            })
            .then(() => {
                this.initRooms();
            })
            .then(() => {
                this.joinRoomById(testRoomId);
            })
        const url = 'http://localhost:31910/pinovanePoruke';
            
        Axios.get(url).then(res => {
            this.setState({ 
                pinnedMessages: this.state.pinnedMessages.concat(res.data)
            }, () => {
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
            messageLimit: 20,
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
            let usersMap = new Map();

            room.users.map((user, index) => {
                usersMap.set(user.id, user.avatarURL);
            })

            this.setState({
                currentRoom: room,
                users: room.users,
                usersAvatars: usersMap
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
        console.log(this.state.currentUser);
        this.state.currentUser.sendMessage({
            text: text,
            roomId: this.state.currentRoom.id
        }).then(() => {
            if(text.substr(0, 11) === "@izvjestaj ") {
                var name = text.substr(11);
                var predmetGodina = name.split(", ");
                var predmetId = findPredmetId(predmetGodina[0]);
                if (predmetId !== -1) {
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
            else if(text.substr(0,11) === '@setAvatar '){
                let url = text.substr(text.indexOf(' ') +1,text.length); 
                Axios.post('http://localhost:31910/updateAvatar', {
                    url: url,
                    currentUId:this.state.currentUser.id
                }).then(res => {
                    window.alert('Avatar will change next time you log in.');

                    let userCopy = this.state.currentUser;
                    userCopy.avatarURL = url;

                    let usersCopy = this.state.users;

                    usersCopy.map((user, index) => {
                        if(user.id === this.state.currentUser.id) user.avatarURL = url;
                    });

                    this.setState({
                        currentUser: userCopy,
                        users: usersCopy
                    })

                    this.forceUpdate();
                })
               .catch(e => console.log(e));            
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
    addUser(userName){
        const rid = this.state.currentRoom.id;
        this.state.currentUser.addUserToRoom({
            userId: userName,
            roomId: rid,
            hooks: {
                onUserJoinedRoom: () => this.forceUpdate()
            }
          })
            .then(() => {
              this.joinRoomById(rid);
              this.setState({hasErrorAddUser:false});
            })
            .catch(err => {
              this.setState({hasErrorAddUser:true});
            })
    }

    createPublicRoom(roomName){
        this.state.currentUser.createRoom({
            name: roomName,
            private: false
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

        let config = {
            header : {
              'Content-Type' : 'multipart/form-data'
            }
        }

        Axios.post('http://localhost:31910/upload', fData, config).then(res => {
            window.alert('Uspješno upisano u bazu!');
            this.addMessage('Downloaduj file: ' + file.name);
            
        }).catch(() => window.alert('Greška...'));
    }

    downloadClick(name){
        const url = 'http://localhost:31910/download/' + name;

        Axios.get(url).then(res => {
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
        .catch(e => console.log(e));

        let msgTmp = this.state.messages.slice(0, index).concat(this.state.messages.slice(index + 1, this.state.messages.length));

        this.setState({
            messages: msgTmp
        })
    }

    handleReply(message) {
        this.setState({ messageToSend: `Replying to ${message.senderId}: "${message.text}"\n>` });
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
                        return m.messageId != message.id;
                    }
                )}, () => { 
                    //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages)); 
                });
                const url2 = 'http://localhost:31910/pinujPoruku/' + message.id;
                Axios.delete(url2).then(res => {}).catch(e => {console.log(e)});
            } 
        });
    }
    handleColorChange(color, event) {
        this.setState({
            colorForUser: color.hex
        }, () => {
            Axios.get('http://localhost:31910/colorscheme/' + this.state.currentUser.id).then(res => {
                if (res.data == 0) {
                    Axios.post('http://localhost:31910/colorscheme', {
                        colorId: color, 
                        userId: this.state.currentUser.id
                    });
                } else {
                    Axios.delete('http://localhost:31910/colorscheme/' + this.state.currentUser.id).then(res => {
                        Axios.post('http://localhost:31910/colorscheme', {
                            colorId: color, 
                            userId: this.state.currentUser.id
                        });
                    }).catch(e => console.log(e));
                };
            })
            
        });
    }
    render() {
        let colorScheme = this.state.colorForUser != null ? this.state.colorForUser : "#5E0565";
        const {
            showColorPicker,
        } = this.state;
        return (
            <div className="chat-app-wrapper">
                <div style={{'background': colorScheme}} className="room-wrapper">
                    <RoomList room={this.state.currentRoom} joinRoomById={this.joinRoomById} rooms={this.state.rooms} joinableRooms={this.state.joinableRooms} />
                    <div className="create-room-wrapper">                     
                        <CreateRoom  style={createRoomStyle} createRoom={this.createRoom}/>
                        <AddUser style={addUserStyle} addUser={this.addUser}/>
                        {this.state.hasErrorAddUser?<p style={{gridColumn: 1/3}}>Error adding user</p>:null} 
                    </div>
                    <NewPublicRoomForm createPublicRoom={this.createPublicRoom}/>
                    <div>
                        <h3 style={{marginTop: '1rem', marginBottom: '1rem'}}>Pinned messages</h3>
                        <ul style={{maxHeight: '200px', overflowY: 'scroll', overflowWrap: 'break-word'}}>
                            {this.state.pinnedMessages.filter(message => message.roomId == this.state.currentRoom.id).map((message,index) => (
                                <div key={index} style={{
                                    'border' : '1px solid white'
                                }}><li>{message.senderId + ' : ' + message.text}</li></div>
                            ))}
                        </ul>
                </div>
                </div>

                <div className="msg-wrapper">
                    <h2 style={{'background': colorScheme}} className="header">Let's Talk</h2>
                    <MessageList currentId={this.props.currentId} replyToMessage={this.handleReply}
                        messages={this.state.messages} pinMessage={this.pinMessage} downloadClick={this.downloadClick} deleteClick={this.deleteClick}
                        usersAvatars={this.state.usersAvatars} />
                    <TypingIndicator typingUsers={this.state.typingUsers} />
                    
                    <Input className="input-field" onSubmit={this.addMessage} onChange={this.sendTypingEvent} replyingTo={this.state.messageToSend}/>
                    <UploadFile onSubmit={this.uploadFile} />
                    <ul className="colors-popup" onMouseLeave={this.toggleColorPicker} >
                    {this.state.showColorPicker ? 
                        <SwatchesPicker onChange={this.handleColorChange}/> 
                    : null}
                    </ul>
                    <button
                        type="button"
                        className="toggle-colors"
                        onClick={this.toggleColorPicker}>
                        <Droplet />
                    </button>
                    
                </div>
                <div style={{'background': colorScheme}} className="list-wrapper">
                    <UsersList openPrivateChat={this.openPrivateChat} users={this.state.users} />
                    <FileSidebar downloadClick={this.downloadClick} />
                </div>
            </div>
        )
    }
}
const createRoomStyle ={
   
    gridColumn: 1/2
}
const addUserStyle = {
   
    gridColumn: 2/3
}
export default ChatApp;