import React, { Component } from 'react';
import Header2 from '../Headers/Header2';
import Footer from '../Footer/Footer';
import './index.css';

class Chat extends Component {
  render() {
    return (
      <div className="Chat">
        <Header2/>
        <h1>Content</h1>
        <Footer/>
      </div>
    );
  }
}

export default Chat;