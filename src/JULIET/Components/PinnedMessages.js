import React, { Component } from 'react';
import '../styles/UsersList.css'

class PinnedMessages extends Component {
    constructor(props){
        super(props);

        this.state = {
            pinnedMessages: []
        }
    }

    componentWillMount(){
        this.props.pinnedMessages ? 
            this.state.pinnedMessages = this.props.pinnedMessages : this.state.pinnedMessages = []
    }

    render(){
        return(
            <div style={{width: '100%', padding: '10px 0'}}>     
                <div className="juliet-section-h" onClick={(e) => {
                        let node = document.getElementById('pinned-messages')
                        let display = node.style.display;
                        node.style.display = display === "block" ? 'none' : "block";
                        node = document.getElementById('arrow-pinned');
                        let innerHTML = node.innerHTML; 
                        node.innerHTML = innerHTML === "keyboard_arrow_right" ? "keyboard_arrow_down" : "keyboard_arrow_right"
                    }}>
                    <div className="juliet-section-header"><h5>Pinned messages</h5></div>
                    <i id="arrow-pinned" class="material-icons-outlined md-14">keyboard_arrow_right</i>
                </div> 
                <ul style={{overflowX: 'hidden', height:'80%', margin: '0', display: 'none'}} id="pinned-messages">
                    {this.state.pinnedMessages.filter(message => message.roomId === this.state.currentRoom.id).map((message,index) => (
                        <div key={index} style={{
                            'border' : '1px solid white'
                        }}><li>{message.senderId + ' : ' + message.text}</li></div>
                    ))}
                </ul>
                
            </div>
        )
    }
}

export default PinnedMessages;