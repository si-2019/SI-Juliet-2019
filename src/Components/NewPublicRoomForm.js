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
        this.setState({roomName:'NewPublicRoom...'})
    }
  render() {
    return (
      <div className="new-room-form" style={{margin: '1%' }}>
        <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type='text' placeholder='NewPublicRoom...' value={this.state.roomName} />
            <button id='create-room-btn' type="submit">+</button>
        </form>
      </div>
    )
  }
}
export default NewPublicRoomForm
