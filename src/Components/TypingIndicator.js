import React, { Component } from 'react'
class TypingIndicator extends Component {
    render(){
        if (this.props.typingUsers.length > 0) {
            return (
              <div style={divStyle}>
                {'Typing: ' + this.props.typingUsers.join(', ') + '...' }
              </div>
            )
          }
        return (
            <div> {''} </div>
        )
    }
}

const divStyle = {
    border: '2px solid #5E0565',
    marginTop: '0px'
}

export default TypingIndicator