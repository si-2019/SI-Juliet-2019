import React, { Component } from 'react'
import axios from 'axios'
import ObjavaProfesor from './objavaProfesor'
import DodavanjeObjave from './dodavanjeObjave'

class SedmicaProfesor extends Component {

  constructor(props){
    super(props);
    this.state={
      objave: [],
      showMe: false,
      tekst: "Dodaj objavu",
      x: false
    }
  }

  ucitaj(props){
    axios.get(`http://localhost:31907/r3/dajMaterijaleZaProfesora/${this.props.idPredmet}/${this.props.sedmice}/${encodeURIComponent(props.naziv)}`).then(res =>{
        this.setState({
          objave: res.data.objave
        })
    })  

    axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res => {
        let x = res.data.naziv == props.naziv
        this.setState({
            naziv: res.data.naziv,
            x: x
        })
    })
  }

  componentDidMount(){
      axios.get(`http://localhost:31907/r3/dajMaterijaleZaProfesora/${this.props.idPredmet}/${this.props.sedmice}/${encodeURIComponent(this.props.naziv)}`).then(res =>{
        this.setState({
          objave: res.data.objave
        })
    })  

    axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res => {
        let x = res.data.naziv == this.props.akademskaGodina
        this.setState({
            naziv: res.data.naziv,
            x: x
        })
    })

  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }

  prikaz(){
    let tekstic = ""
    if(!this.state.showMe){
      tekstic="Poništi"
    }
    else{
      tekstic="Dodaj objavu"
    }
    this.setState({
      showMe:!this.state.showMe,
      tekst: tekstic
    })
  }

  render() {
    return (
      
        <div class='divsaokvirom'>
            <h4 class='naslov'>{this.props.naslov}</h4>
            {this.state.objave.map(file => <ObjavaProfesor akademskaGodina={this.props.naziv} id={file.id} idpredmeta={this.props.idpredmeta} naslov={file.naziv} opis={file.opis} fileovi={file.datoteke} datumobjave={file.datum} objavljeno={file.objavljeno}></ObjavaProfesor>)}
            { this.state.showMe?<DodavanjeObjave idPredmeta={this.props.idpredmeta} sedmica={this.props.sedmice}/>:null}
            {this.state.x && <button type="button" onClick={()=>this.prikaz()} class="btn btn-primary" id="dodajObjavu">{this.state.tekst}</button>}
          </div>
    );
  }
}

export default SedmicaProfesor