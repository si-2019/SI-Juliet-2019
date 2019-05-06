import React, { Component } from 'react'
class TypingIndicator extends Component {
    render(){
        if (this.props.typingUsers.length > 0) {
            return (
              <div style={divStyle}>
                {'Typing: ' + `${this.props.typingUsers
                  .slice(0, this.props.typingUsers.length)
                  .join(', ')}`}
              </div>
            )
          }
          return (
            <div />
          )
    }
}

const divStyle = {
    border: '1px solid blue'
}

export default TypingIndicator