import React, { Component } from "react";
import axios from 'axios';
import ListaPredmeta from "../ListaPredmeta/ListaPredmeta";
import DrugiModuli from "../DrugiModuli/DrugiModuli";
import Ispiti from "../Ispiti/Ispiti";
import Zadace from "../Zadace/Zadace";
import KonacnaOcjena from "../KonacnaOcjena/KonacnaOcjena";
import "./AppDelta.css";

class Predmet extends Component {

  state = {predmet:"", profesor:""};

    async componentDidMount(){
     //hardkodirane vrijednosti
      const idPredmet=64;

      const {data} = await axios.get('http://si2019delta.herokuapp.com/dohvatiPredmet/'+idPredmet); 
      this.setState({predmet:data});
      const idProf = this.state.predmet.idProfesora;
      const {data1} = await axios.get('http://si2019delta.herokuapp.com/dohvatiProfesora/'+this.state.predmet.idProfesora); 
      this.setState({profesor:data1});
      
      
    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <b>Predmet:</b> { this.state.predmet.naziv}
            </div>
            <div className="row">
              <b>Odgovorni nastavnik:</b> {this.state.predmet.idProfesora}
            </div>
            <div className="row">
              <b>Opis predmeta:</b>{this.state.predmet.opis}
            </div>
            <div className="row">
              <b>Broj ETCS bodova: </b>{this.state.predmet.ects}
            </div>
            <br />
            <Zadace />
            <br />
            <Ispiti />
            <br />
            <div className="row">
              <div className="col-3" />

              <div>
                <KonacnaOcjena />
              </div>
            </div>
            <div className="row">
              <div>
                <DrugiModuli />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Predmet;
