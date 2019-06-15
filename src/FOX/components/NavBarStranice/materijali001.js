import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../Footer/Footer';
import Navbar001 from '../Navbar/Navbar001';

class materijali001 extends Component {
  render() {
    return (
      <div className="materijali001">
        <Header/>
        <br></br>
        <h1>Stranica predmeta</h1>
        <br></br>
        <Navbar001/>
        <h1>FUNKCIONALNOST ZA MATERIJALI OPCIJU - cekamo podatke</h1>
        <Footer/>
      </div>
    );
  }
}

export default materijali001;
