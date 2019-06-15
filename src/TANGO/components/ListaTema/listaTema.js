import React, {Component} from 'react';
import Teme from '../Tema';
import DugmeZaSort from '../DugmeZaSort';
import Paginacija from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import LISTA_PROBNA from './LISTA';


import {
  withRouter
} from 'react-router-dom'
import { resolve } from 'path';

const themesApi= 'http://localhost:31919/getThemes/'; //plus id teme



class Lista extends Component{
  constructor() {
    super();
    this.state = {
      teme:[],
      podnizTema: [],
      trenutnaStranica: 1,
      maxPoStranici: 10,
      obrnut: false,
      ukupno:0
    };
    
  }
  
  componentWillMount(){
    this.setState({ucitavanje:true});
    fetch(themesApi+"idPredmeta=4&idUser=1") 
      .then(response=>response.json())
      .then(teme=>{
        var ts= this.state.trenutnaStranica - 1;
        var leng= this.state.teme.length;
        this.setState({teme:teme, ucitavanje:true});
        var ts= this.state.trenutnaStranica - 1;
        var leng= this.state.teme.length;
        var pocetniPodniz = this.dajPodniz(ts,(leng>=10) ? 10 : leng);
        this.setState({teme:teme, podnizTema: pocetniPodniz, ucitavanje:false, ukupno:leng})
      });
    //this.setState({teme:LISTA_PROBNA,ucitavanje:false});
  }
 //                   dodaj ,obrnut
  promjeniStateNiza (niz, obrnut, vm) {
    let newState = this.state;
    const trSt= this.state.trenutnaStranica - 1;
    const mPS= this.state.maxPoStranici;
    const ukBrTe=this.state.teme.length;
    var poc = trSt*mPS;
    if(poc + mPS > ukBrTe)
      var kr = ukBrTe;
    else var kr = poc + mPS;
    var podnizTema = this.dajPodniz(trSt*mPS, kr);
    newState = {
      teme:niz,
      podnizTema: podnizTema,
      obrnut: obrnut
    }
    this.setState(newState);
  }
  
  dajPodniz = (pocetak, kraj) =>{
    var teme=this.state.teme;
    var podnizTema= teme.slice(pocetak, kraj);
    return podnizTema;
  }

  handlePromjenuStranice = stranica => {
    const trenutnaStranica= stranica - 1;
    const maxPoStranici= this.state.maxPoStranici;
    const ukupanBrojTema=this.state.teme.length;
    var pocetak = trenutnaStranica*maxPoStranici;
    if(pocetak + maxPoStranici > ukupanBrojTema)
      var kraj = ukupanBrojTema;
    else var kraj = pocetak + maxPoStranici;
    var podnizTema = this.dajPodniz(pocetak, kraj);
    this.setState({ucitavanje:true});
    this.setState({
        podnizTema: podnizTema,
        trenutnaStranica: stranica,
        ucitavanje : false
    })
  }
  searchTema (evt) {
    var pom = this.state.teme;
    this.setState({trenutnaStranica: 1});

    pom =  pom.filter(function(item) {
      console.log(JSON.stringify(item));
      console.log(item.title.indexOf((evt.target.value)));
      return item.title.indexOf((evt.target.value))!=-1;
  });
  this.setState({ukupno: pom.length});

    this.setState({podnizTema:pom});
  

  }

  render(){
    if(this.state.ucitavanje){
      return <p>Ucitavanje...</p>
    }
      return(
        <div>
          <div>< button type="button" class="btn btn-primary"><a href="/Tango/NovaTema">Dodaj novu temu</a></button>
 </div>
          <div>
            <DugmeZaSort 
              teme={this.state.teme} 
              sortirajNiz={this.promjeniStateNiza.bind(this)}
              obrnut={this.state.obrnut}
            />
          </div>
          <div>
            <input type='text' class="form-control bg-white rounded" onChange={this.searchTema.bind(this)} placeholder="Search"></input>
          </div>
          {/* <button onClick={() => {this.sortirajAZ(this.state.teme)}}>a-z</button> */}
        <div>
          <Teme teme={this.state.podnizTema}/>
        </div>
        <div>
          <Paginacija onChange={this.handlePromjenuStranice} current={this.state.trenutnaStranica} total={this.state.ukupno}/>
        </div>
        </div>
      );
  }
  
  
}

export default Lista;
