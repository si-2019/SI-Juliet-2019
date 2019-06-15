import React, { Component } from 'react';
import Header1 from '../Headers/Header1';
import DanDatum from '../DanDatum/DanDatum';
import Footer from '../Footer/Footer';
import Dobrodosli from '../Dobrodosli/Dobrodosli';
import Predmet from '../Predmet/Predmet';
import './index.css';

class Pocetna extends Component {
  render() {
    return (
      <div className="Pocetna">
        <Header1/>
        <Dobrodosli name="GETprofNaziv(this.props.name)"/>
        
        <Predmet/>
        <Footer/>
      </div>
    );
  }
}

export default Pocetna;