import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Navbar001 from '../Navbar001';

class profesori001 extends Component {
  render() {
    return (
      <div className="profesori001">
        <Header/>
        <br></br>
        <h1>Stranica predmeta</h1>
        <br></br>
        <Navbar001/>
        <h1>FUNKCIONALNOST ZA PROFESORI OPCIJU - cekamo podatke o osoblju</h1>
        <Footer/>
      </div>
    );
  }
}

export default profesori001;