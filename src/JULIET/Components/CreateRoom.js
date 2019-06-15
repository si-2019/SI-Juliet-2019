import React, { Component } from 'react';
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
        // <button id='create-room-btn' type="submit">+</button>
            <form onSubmit={this.handleSubmit} className="new-room-form">
                <input className="input-group mb-3 juliet-message-input" type="text" style={inputStyle}
                placeholder="Create private room..." onChange={this.handleChange} value={this.state.roomName} />
                <button id='create-private-room-btn' type="submit" style={{width: '10%'}}>+</button>
                {/* <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Create" /> */}
            </form>
        )
    }
}

const inputStyle = {
    width: '90%',
    padding: '0',
    display: 'inline-block'
}
export default CreateRoom;