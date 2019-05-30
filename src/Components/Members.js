import React, { Component } from 'react';
import '../styles/UsersList.css'
import '../styles/RoomList.css';
import AddUser from './AddUser';
import { LensTwoTone } from '@material-ui/icons';

class Members extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            room_users: this.props.room_users, 
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

    render(){
        if(this.props.room_users && this.props.currentUser){
            const currentUser = this.props.currentUser;
            return(
                <div style={{width: '100%', padding: '10px 0'}}>     
                    <div className="section-h" onClick={(e) => {
                            let node = document.getElementById('all-members')
                            let display = node.style.display;
                            node.style.display = display == "block" ? 'none' : "block";
                            node = document.getElementById('arrow-members');
                            let innerHTML = node.innerHTML; 
                            console.log(innerHTML);
                            node.innerHTML = innerHTML == "keyboard_arrow_right" ? "keyboard_arrow_down" : "keyboard_arrow_right"
                        }}>
                        <div className="section-header"><h5>Members</h5></div>
                        <i id="arrow-members" class="material-icons-outlined md-14">keyboard_arrow_right</i>
                    </div> 
                    <ul style={{overflowX: 'hidden', height:'80%', margin: '0', display: 'none'}} id="all-members">
                        {this.props.room_users.map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="user" key={index}>  
                                <div className="presence-state"> {user.presence.state === 'online' && <i class="material-icons md-12 md-online">fiber_manual_record</i> || user.presence.state === 'offline' && <i class="material-icons-outlined md-12">fiber_manual_record</i>}</div>
                                <div className="username-name">{user.name}</div>
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

export default Members;