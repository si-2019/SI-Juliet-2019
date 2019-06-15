import React, { Component } from 'react';
import Header2 from '../Headers/Header2';
import Footer from '../Footer/Footer';
import './index.css';

class Materijali extends Component {
  render() {
    return (
      <div className="Materijali">
        <Header2/>
        <h1>Content</h1>
        <Footer/>
      </div>
    );
  }
}

export default Materijali;