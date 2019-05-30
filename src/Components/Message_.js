import React from 'react'
import '../styles/Message.css'
import { format } from 'date-fns';

class Message_ extends React.Component {
    render() {
        return(
            <div className="juliet-message">
                <div className="avatar-container">
                    <img src={(this.props.user && this.props.user.avatarURL) || "avatar.png"} className="avatar"></img>
                </div>
                <div className="message-container">
                    <h4 className="message-sender" onClick={this.props.openPrivateChat}>{this.props.user && this.props.user.name} <span className="message-time">{format(new Date(this.props.date), 'DD. mmm, HH:mm')}</span></h4>
                    <p className="message-text" >
                        {this.props.text}
                    </p>
                </div>
                
                {/* <div className="juliet-message-username"> {this.props.user} </div>
                <div className="timeDiv"> {format(new Date(message.createdAt), 'DD.MM.YYYY. - HH:mm')} </div>
                <div className="juliet-message-message"> {this.props.text} </div> */}
            </div>
        )
    }
}



export default Message_;