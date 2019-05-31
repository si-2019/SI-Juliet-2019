import React, { Component } from 'react';
import '../styles/UsersList.css'
import '../styles/RoomList.css';
import NewPublicRoomForm from './NewPublicRoomForm';
import CreateRoom from './CreateRoom';

class UsersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: this.props.users, 
            input: '',
            currentUser: this.props.currentUser,
            joinableRooms:this.props.joinableRooms,
            rooms: this.props.rooms
        }
    }

    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }
    triggerAdd(user, index) {
        if(typeof this.props.currentUser.customData === "undefined"  || !Array.isArray(this.props.currentUser.customData.favoriteUsers)) {
            this.props.currentUser.customData = {
                'favoriteUsers': [user.id]
            }
            this.props.chatkit.updateUser({
                id: this.props.currentUser.id,
                customData: {
                    favoriteUsers: [user.id]
                }
            })
        } else {
            this.props.currentUser.customData.favoriteUsers.push(user.id);
            this.props.chatkit.updateUser({
                id: this.props.currentUser.id,
                customData: {
                    favoriteUsers: this.props.currentUser.customData.favoriteUsers
                }
            })
        }

        this.setState({
            currentUser: this.props.currentUser
        })
    }

    triggerDelete(user, index){
        this.props.currentUser.customData.favoriteUsers = this.props.currentUser.customData.favoriteUsers.filter(function(el){
            return el !== user.id;
        });

        this.props.chatkit.updateUser({
            id: this.props.currentUser.id,
            customData: {
                favoriteUsers: this.props.currentUser.customData.favoriteUsers
            }
        })
        this.setState({
            currentUser: this.props.currentUser
        })
     }

    render(){
        const listSrc = this.props.users.filter(d => d.id.includes(this.state.input));
        const favoriteUsers = this.props.users.filter(d => this.props.currentUser.customData && this.props.currentUser.customData.favoriteUsers && this.props.currentUser.customData.favoriteUsers.includes(d.name) && d.id.includes(this.state.input));
        if(this.props.users && this.props.currentUser){
            const currentUser = this.props.currentUser;
            return(
                <div style={{height: '100%', width: '100%'}}>           
                    <input placeholder="Pretraži..." className="user-search-input" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
                    <ul style={{overflowX: 'hidden', height:'calc(100% - 54px)', margin: '0'}}>
                        <div className="section-h">
                            <div className="section-header"><h5>Rooms</h5></div>
                            <div className="remove section-icon" onClick={(e)=> {
                                var node = document.getElementById('addRoom')
                                var display = node.style.display;
                                node.style.display = display == "block" ? 'none' : "block"
                                }}><i class="material-icons-outlined md-14">add_circle_outline</i>
                            </div>
                        </div>
                        <div id="addRoom" style={{display: 'none'}}>
                            <div>                     
                                <CreateRoom  style={createRoomStyle} createRoom={this.props.createRoom}/>
                                {/* <AddUser style={addUserStyle} addUser={this.props.addUser}/>
                                {this.props.hasErrorAddUser?<p style={{gridColumn: 1/3}}>Error adding user</p>:null}  */}
                                <NewPublicRoomForm style={createRoomStyle} createPublicRoom={this.props.createPublicRoom}/>
                            </div>
                        </div>
                        {this.props.rooms.filter(room => !room.isPrivate && room.name.includes(this.state.input)).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"room" + active + " user"} onClick={() => this.props.joinRoomById(room.id)}
                            key={index}>
                                <div className="presence-state"><i class="material-icons md-12">public</i> </div>
                                <div className="username-name">{room.name}</div>
                                </li>
                        })}

                        {this.props.rooms.filter(room => room.isPrivate && room.name.includes(this.state.input)).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"room" + active + " user"} onClick={() => this.props.joinRoomById(room.id)} 
                            key={index}>
                                <div className="presence-state"><i class="material-icons md-12">lock</i> </div>
                                <div className="username-name">{room.name}</div>
                            </li>
                        })}
                        
                        {this.props.joinableRooms.length > 0 && <h5 className="section-header">Joinable Public Rooms</h5>}
                        {this.props.joinableRooms.filter(room => room.name.includes(this.state.input)).map(room => {
                        return (
                            <li key={room.id} className="room user" onClick={()=>this.props.joinRoomById(room.id)}>
                                <div className="presence-state"><i class="material-icons md-12">public</i> </div>
                                <div className="username-name">{room.name}</div>
                            </li>                        
                            )
                        })}
                        
                        {favoriteUsers.length > 0 && <h5 className="section-header">Favorite users</h5> }
                        {favoriteUsers.map((user, index) => {
                                return <li className="user" key={index} onClick={() => this.props.openPrivateChat(user.id)} >
                                    <div className="presence-state"> {user.presence.state === 'online' && <i class="material-icons md-12 md-online">fiber_manual_record</i> || user.presence.state === 'offline' && <i class="material-icons-outlined md-12">fiber_manual_record</i>}</div>
                                    <div className="username-name">{user.name}</div>
                                    <div className="remove" onClick={(e)=>{
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.triggerDelete(user, index);
                                    }}><i class="material-icons-outlined md-14">cancel</i></div>
                                </li>
                            })
                        }
                        
                        <h5 className="section-header">Users</h5>
                        {listSrc.filter((user) => (currentUser.customData == null || 
                            typeof currentUser.customData.favoriteUsers !== "undefined" && !currentUser.customData.favoriteUsers.includes(user.id))).map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="user" key={index}>  
                                <div className="presence-state"> {user.presence.state === 'online' && <i class="material-icons md-12 md-online">fiber_manual_record</i> || user.presence.state === 'offline' && <i class="material-icons-outlined md-12">fiber_manual_record</i>}</div>
                                <div className="username-name">{user.name}</div>
                                <div className="remove" onClick={(e)=> {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.triggerAdd(user, index);
                                }}><i class="material-icons-outlined md-14">add_circle_outline</i></div> 
                            </li>
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <p>Loading...</p>
            )
        }
    }
}

const createRoomStyle ={
    gridColumn: 1/2
}

const inpStyle = {
    borderRadius : '0.25rem',
    height: '40px',
    margin: '2px'
}
const userSearch = {
    borderRadius : '0.25rem',
    height: '40px',
    margin: '2px'
}
export default UsersList;