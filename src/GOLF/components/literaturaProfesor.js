import React, { Component } from 'react';
import ObjavaProfesor from './objavaProfesor'
import axios from 'axios'
import DodavanjeLiterature from './dodavanjeLiterature'

class LiteraturaProfesor extends Component {
  state={
    objave: [],
    showMe: false,
    tekst: "Dodaj objavu",
    x: false
  }

  ucitaj(props){
    axios.get(`http://localhost:31907/r3/dajLiteraturuZaProfesora/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res =>{
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
    axios.get(`http://localhost:31907/r3/dajLiteraturuZaProfesora/${this.props.idPredmeta}/${encodeURIComponent(this.props.naziv)}`).then(res =>{
      this.setState({
        objave: res.data.objave
            })
  })
  axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res => {
        let x = res.data.naziv == this.props.naziv
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

 render(){


    return (
        <div class="divsaokvirom">
        	<h4 class='naslov'>Literatura</h4>
          {this.state.objave.map(file => <ObjavaProfesor akademskaGodina={this.props.naziv} idpredmeta={this.props.idpredmeta} naslov={file.naziv} opis={file.opis} fileovi={file.datoteke} datumobjave={file.datum} objavljeno={file.objavljeno}></ObjavaProfesor>)}
          { this.state.showMe?<DodavanjeLiterature idPredmeta={this.props.idPredmeta}/>:null}
            {this.state.x && <button type="button" onClick={()=>this.prikaz()} class="btn btn-primary" id="dodajObjavu">{this.state.tekst}</button>}
        </div>
        
    );
  }
}

export default LiteraturaProfesor