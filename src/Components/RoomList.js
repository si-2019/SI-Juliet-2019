import React, { Component } from 'react';
import '../styles/RoomList.css';

class RoomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            joinableRooms:this.props.joinableRooms,
            rooms: this.props.rooms
        }
    }

    render(){
        if(this.props.rooms && this.props.room){
            return(
                <div>
                {/* <h2 style={{marginTop: '2rem', marginBottom: '1rem'}}>Rooms</h2> */}
                    <ul style={{overflowX: 'hidden', height:'400px'}}>
                        <h6>Public Rooms</h6>
                        {this.props.rooms.filter(room => !room.isPrivate).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"room" + active} onClick={() => this.props.joinRoomById(room.id)}
                            key={index}>#{room.name}</li>
                        })}
                        <h6>Joinable Public Rooms</h6>
                        {this.props.joinableRooms.map(room => {
                        return (
                            <li key={room.id} className="room" onClick={()=>this.props.joinRoomById(room.id)}>
                                #{room.name}</li>                        
                            )
                        })}
                        <h5>Private rooms</h5>
                        {this.props.rooms.filter(room => room.isPrivate).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"room" + active} onClick={() => this.props.joinRoomById(room.id)} 
                            key={index}>
                                {room.name}
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

export default RoomList;