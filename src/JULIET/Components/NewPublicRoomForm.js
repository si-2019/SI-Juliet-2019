import React, { Component } from 'react'


export class NewPublicRoomForm extends Component {
    constructor(){
        super()
        this.state={
            roomName:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({ roomName:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.createPublicRoom(this.state.roomName);
        this.setState({roomName:''})
    }
  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
            <input className="input-group mb-3 juliet-message-input" style={inputStyle} onChange={this.handleChange} type='text' placeholder='Create public room...' value={this.state.roomName} />
            <button id='create-room-btn' type="submit" style={{width: '10%'}}>+</button>
        </form>
      </div>
    )
  }
}

const inputStyle = {
  width: '90%',
  padding: '0',
  display: 'inline-block'
}

export default NewPublicRoomForm
