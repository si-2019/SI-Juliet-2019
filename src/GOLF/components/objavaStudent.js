import React, { Component } from 'react';
import DodavanjeDatuma from './DodavanjeDatuma';
import OpisMaterijala from './OpisMaterijala';
import axios from 'axios';
import './golf.css'

class objavaStudent extends Component {

  constructor(props){
    super(props);
    this.state =  {
      datumobjave: this.props.datumobjave
  
    }
  }

  render() {
    return (
        <div class="card sss" id="objava">
            <div class="card-body">
            <h5 class="card-title">{this.props.naslov}</h5>
            <OpisMaterijala opisMaterijala={this.props.opisMaterijala}></OpisMaterijala>
              {this.props.fileovi.map(file => [<a href={'http://localhost:31907/r1/dajFile?id='+file.id} target="_blank" class='card-link'>{file.naziv}</a>,<br></br>])}
            <DodavanjeDatuma datumobjave={this.state.datumobjave}></DodavanjeDatuma>
            </div>
        </div>
    );
  }
}

export default objavaStudent;