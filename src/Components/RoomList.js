import React, { Component } from 'react';
import '../styles/RoomList.css';

class RoomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rooms: this.props.rooms
        }
    }

    render(){
        if(this.props.rooms && this.props.room){
            return(
                <div style={{color: 'white' }}>
                <h2 style={{marginTop: '5rem', marginBottom: '1rem'}}>Rooms</h2>
                <ul style={{overflowY: 'scroll', overflowX: 'hidden', height:'400px'}}>
                        <h4>Public rooms</h4>
                        {this.props.rooms.filter(room => !room.isPrivate).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"room" + active} onClick={() => this.props.joinRoomById(room.id)}
                            key={index}><h4> #{room.name}</h4> </li>
                        })}
                        <br />
                        <br />
                        <h4>Private rooms</h4>
                        {this.props.rooms.filter(room => room.isPrivate).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"room" + active} onClick={() => this.props.joinRoomById(room.id)} 
                            key={index}>
                                <h5 style={{whiteSpace: 'nowrap', textOverflow: 'elipsis'}}>
                                {room.name}</h5> 
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