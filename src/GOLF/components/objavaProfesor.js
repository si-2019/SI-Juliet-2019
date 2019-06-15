import React, { Component } from 'react';
import DodavanjeDatuma from './DodavanjeDatuma';
import OpisMaterijala from './OpisMaterijala'
import UredjivanjeObjave from './UredjivanjeObjave'
import axios from 'axios';
import './golf.css'

class objavaProfesor extends Component {
  
  state =  {
    datumobjave:{
      id:1,
      datum:Date.now()
    },
    naziv: "",
    x: false,
    showMe: false
  }

  componentDidMount(){
    axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res => {
        let x = res.data.naziv == this.props.akademskaGodina
        this.setState({
            naziv: res.data.naziv,
            x: x
        })
    })
    console.log(this.props.objavljeno)
  }

  ucitaj(props){
    axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res => {
        let x = res.data.naziv == props.akademskaGodina
        this.setState({
            naziv: res.data.naziv,
            x: x
        })
    })
  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }

  obrisi(){
    axios.delete(`http://localhost:31907/r1/obrisiMaterijal/${this.props.idpredmeta}/${this.props.id}`)
      window.location.reload()
  }

  prikaziUredjivanje(){
    this.setState({
      showMe:!this.state.showMe
    })
  }

  render() {


    return (
        <div class="card sss" id="objava">
            <div class="card-body">
            <div class="row">  
            <div class='col-8'>
            <h5 class="card-title">{this.props.naslov} 
            {!this.props.objavljeno && <span class="badge badge-pill badge-primary" id="bedz">Sakriveno</span>}
            </h5>
            
            </div>
            <div class='col-4'>
    {this.state.x && <div> 
      <button type="button" class="btn btn-primary golfDugme" onClick={()=>this.prikaziUredjivanje()}>Uredi</button>
      <button type="submit" class="btn btn-danger golfDugme" onClick={()=>this.obrisi()}>Obriši</button>
      </div>}
    </div>
            </div>
            <OpisMaterijala opisMaterijala={this.props.opis}></OpisMaterijala>
              {this.props.fileovi.map(file => [<a href={'http://localhost:31907/r1/dajFile?id='+file.id} target="_blank" class='card-link'>{file.naziv}</a>,<br key='2'></br>])}
            <DodavanjeDatuma datumobjave={this.state.datumobjave}></DodavanjeDatuma>
            </div>
            {this.state.showMe && <UredjivanjeObjave idMaterijala={this.props.id} opis={this.props.opis} fileovi={this.props.fileovi} naslov={this.props.naslov} objavljeno={this.props.objavljeno}/>}
        </div>
    );
  }
}

export default objavaProfesor;