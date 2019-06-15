import React, { Component } from 'react';
import Header2 from '../Headers/Header2';
import Footer from '../Footer/Footer';
import './index.css';

class Forum extends Component {
  render() {
    return (
      <div className="Forum">
        <Header2/>
        <h1>Content</h1>
        <Footer/>
      </div>
    );
  }
}

export default Forum;