import React, { Component } from 'react';
import './style.css';
import {ProgressBar} from 'react-bootstrap'
import Colors from './colorPalette'
import axios from 'axios'; 

class Rezultati extends Component {
  state= {
    imeKreator: '', 
    datumKreiranjaAnkete: '',
    datumIstekaAnkete: '', 
    tipAnkete: '', 
    nazivPredmeta: '',
    singleChoicePitanjaState: {},
    textboxPitanjaState: {},
    multipleChoicePitanjaState: {},
    starRatingPitanjaState: {}

  }
   formatDate (string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}
  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`http://localhost:9123/getKreator/?idAnketa=${params.id}`)
    .then((res) => {
      this.setState({imeKreator:res.data.kreator}); 
      console.log('res1', res);
    });
    axios.get(`http://localhost:9123/getDatumKreiranjaAnkete/?idAnketa=${params.id}`)
    .then((res) => {
      
      this.setState({datumKreiranjaAnkete:this.formatDate(res.data.datumKreiranja)}); 
      console.log('res2', res);
    });
    axios.get(`http://localhost:9123/getDatumIstekaAnkete/?idAnketa=${params.id}`)
    .then((res) => {
      
      this.setState({datumIstekaAnkete:this.formatDate(res.data.datumIstekaAnkete)}); 
      console.log('res3', res);
    });
    axios.get(`http://localhost:9123/getTipAnkete/?idAnketa=${params.id}`)
    .then((res) => {
      
      this.setState({tipAnkete:res.data.tipAnkete}); 
      console.log('res4', res);
    });
    axios.get(`http://localhost:9123/getPredmet/?idAnketa=${params.id}`)
    .then((res) => {
      
      this.setState({nazivPredmeta:res.data.nazivPredmeta}); 
      console.log('res5', res);
    });
    axios.get(`http://localhost:9123/getRezultatiAnkete/?idAnketa=${params.id}`)
    .then((res) => {
      var pitanja = res.data;
      var textboxPitanja = [];
      var singleChoicePitanja = [];
      let multipleChoicePitanja = [];
      let starRatingPitanja = [];
      for(var i=0;i<pitanja.length;i++){
        if(pitanja[i].vrstaPitanja == 'textbox') textboxPitanja.push(pitanja[i]);
        else if(pitanja[i].vrstaPitanja == 'single-choice') singleChoicePitanja.push(pitanja[i]);
        else if(pitanja[i].vrstaPitanja == 'star-rating') starRatingPitanja.push(pitanja[i])
        else multipleChoicePitanja.push(pitanja[i])
      }
      this.setState({
        singleChoicePitanjaState: {singleChoicePitanja},
        multipleChoicePitanjaState: {multipleChoicePitanja},
        starRatingPitanjaState: {starRatingPitanja}
      });
      this.setState({textboxPitanjaState: {textboxPitanja}});
      console.log('single', singleChoicePitanja);
      console.log('res6', res);
    });
  }
  render() {
    const itemsSingle = this.state.singleChoicePitanjaState;
    const itemsTextbox = this.state.textboxPitanjaState;
    const itemsMultiple = this.state.multipleChoicePitanjaState;
    const itemsStar = this.state.starRatingPitanjaState;
    console.log("items", itemsSingle);
    return (
      <div className="App"  id="containerRezultati">

        <div id="headerRezultati">
        <h1 style={{color: "white"}}>Rezultati</h1>
        </div>       

        <div id="contentRezultati">

            <div id="infoRezultati">
              <div id ="info1Rezultati">

                <div class="card text-white bg-secondary mb-3" >
                            <div class="card-header"><h4 class="card-title">Info</h4></div>
                            <div class="card-body">
                              <h6 class="card-title">Predmet</h6>
                              <p class="card-text">{this.state.nazivPredmeta}</p>
                            </div>
                            <div class="card-body">
                              <h6 class="card-title">Datum kreiranja</h6>
                              <p class="card-text">{this.state.datumKreiranjaAnkete}</p>
                            </div>
                            <div class="card-body">
                              <h6 class="card-title">Datum isteka ankete</h6>
                              <p class="card-text">{this.state.datumIstekaAnkete}</p>
                            </div>
                            <div class="card-body">
                              <h6 class="card-title">Tip ankete</h6>
                              <p class="card-text">{this.state.tipAnkete}</p>
                            </div>
                            <div class="card-body">
                              <h6 class="card-title">Anketu kreirao</h6>
                              <p class="card-text">{this.state.imeKreator}</p>
                            </div>
                </div>

              </div>        
            </div>

            <div id="showRezultati">
              <div id="show1Rezultati">

                <div class="card border-light mb-3" style={{padding:15}}>
                  <div class="card-header"><h4 class="card-title">Anketa</h4></div>
                    <br></br>
                    <div>
                      {itemsSingle.singleChoicePitanja ? itemsSingle.singleChoicePitanja.map(pitanje => (
                        <div class="card-body-pitanje" style={{backgroundColor:'white'}}>
                          <h4 class="card-title">Pitanje : {pitanje.tekstPitanja}</h4>
                          <hr/>
                          <p class="card-text">Najčešći odgovor : {pitanje.prosjecniOdgovor}</p>
              
                          <div>
                            <ProgressBar>
                              {
                                (pitanje.odgovori && Colors.getRandom(pitanje.odgovori.length)) ? pitanje.odgovori.map((odgovor, i) => (
                                <ProgressBar style={{backgroundColor: Colors.colors[i]}} now={odgovor.postotak} key={i} />
                              )): null}
                            </ProgressBar>
                          </div>
                          <div>
                            {pitanje.odgovori ? pitanje.odgovori.map((odgovor, i) => (
                              <div style={{color: Colors.colors[i]}}>
                                <p class="card-text">Odgovor : {odgovor.odgovor} ( {odgovor.postotak} %)</p>
                                 
                              </div>
                            )) : "..."}
                          </div>
                        </div>
                      )) : "Loading..."}
                    </div>
                    <div>
                      {itemsMultiple.multipleChoicePitanja ? itemsMultiple.multipleChoicePitanja.map(pitanje => (
                        <div class="card-body-pitanje" style={{backgroundColor:'white'}}>
                          <h4 class="card-title">Pitanje : {pitanje.tekstPitanja}</h4>
                          <hr/>
                          <p class="card-text">Najčešći odgovor : {pitanje.prosjecniOdgovor}</p>
              
                          <div>
                            <ProgressBar>
                              {
                                (pitanje.odgovori && Colors.getRandom(pitanje.odgovori.length)) ? pitanje.odgovori.map((odgovor, i) => (
                                <ProgressBar style={{backgroundColor: Colors.colors[i]}} now={odgovor.postotak} key={i} />
                              )): null}
                            </ProgressBar>
                          </div>
                          <div>
                            {pitanje.odgovori ? pitanje.odgovori.map((odgovor, i) => (
                              <div style={{color: Colors.colors[i]}}>
                                <p class="card-text">Odgovor : {odgovor.odgovor} ( {odgovor.postotak} %)</p>
                                 
                              </div>
                            )) : "..."}
                          </div>
                        </div>
                      )) : "Loading..."}
                    </div>
                    <div>
                      {itemsStar.starRatingPitanja ? itemsStar.starRatingPitanja.map(pitanje => (
                        <div class="card-body-pitanje" style={{backgroundColor:'white'}}>
                          <h4 class="card-title">Pitanje : {pitanje.tekstPitanja}</h4>
                          <hr/>
                          <p class="card-text">Najčešći odgovor : {pitanje.prosjecniOdgovor}</p>
              
                          <div>
                            <ProgressBar>
                              {
                                (pitanje.odgovori && Colors.getRandom(pitanje.odgovori.length)) ? pitanje.odgovori.map((odgovor, i) => (
                                <ProgressBar style={{backgroundColor: Colors.colors[i]}} now={odgovor.postotak} key={i} />
                              )): null}
                            </ProgressBar>
                          </div>
                          <div>
                            {pitanje.odgovori ? pitanje.odgovori.map((odgovor, i) => (
                              <div style={{color: Colors.colors[i]}}>
                                <p class="card-text">Odgovor : {odgovor.odgovor} ( {odgovor.postotak} %)</p>
                                 
                              </div>
                            )) : "..."}
                          </div>
                        </div>
                      )) : "Loading..."}
                    </div>
                    <div>
                      {itemsTextbox.textboxPitanja ? itemsTextbox.textboxPitanja.map(pitanje => (
                        <div class="card-body-pitanje" style={{backgroundColor:'white'}}>
                          <h4 class="card-title">Pitanje : {pitanje.tekstPitanja}</h4>
                          <hr/>
                          <br></br>
                          <div>
                            {pitanje.odgovori ? pitanje.odgovori.map(odgovor => (
                              <div style={{alignItems:'left'}}>
                                <p class="card-text">Odgovor : {odgovor.odgovor}</p>
                                <br></br>
                              </div>
                            )) : "..."}
                          </div>
                        </div>
                      )) : "Loading..."}
                    </div>
                </div>

              </div>
            </div>

        </div>
      </div>
    );
  }
}

export default Rezultati;


