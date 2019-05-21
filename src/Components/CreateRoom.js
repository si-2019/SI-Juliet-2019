import React, { Component } from 'react';
import '../styles/CreateRoom.css';
class CreateRoom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roomName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({
            roomName: ''
        })
    }
    render() {
        return (
        
            <form onSubmit={this.handleSubmit} className="create-room-form">
            
            <input className="input-group mb-3 message-input" type="text" style={inputStyle}
            placeholder="Create room" onChange={this.handleChange} value={this.state.roomName} />
            <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Create" />
        </form>
        )
    }
}
const buttonStyle = {
    height: '40%',

}

const inputStyle = {
    width: '100%',
    padding: '0'
}
export default CreateRoom;