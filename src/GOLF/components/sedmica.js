import React, { Component } from 'react';
import axios from 'axios'
import ObjavaStudent from './objavaStudent'
import ObjavaProfesor from './objavaProfesor'
import DodavanjeObjave from './dodavanjeObjave'

class sedmica extends Component {
  constructor(props){
    super(props);
    this.state={
      objave: [],
      objave1: [],
      showMe: false
    }
  }

  componentDidMount(){
    if(this.props.student == "student"){
      axios.get(`http://localhost:31907/r3/dajMaterijaleZaStudenta/${this.props.idPredmet}/${this.props.sedmice}`).then(res =>{
        //console.log(this.props.idPredmet)
        //console.log({res: res.data.objave})
        this.setState({
          objave: res.data.objave
        })
      })
    }
    else {
      axios.get(`http://localhost:31907/r3/dajMaterijaleZaProfesora/${this.props.idPredmet}/${this.props.sedmice}`).then(res1 =>{
        //console.log(this.props.idPredmet)
        //console.log({res1: res.data.objave})
        this.setState({
          objave1: res1.data.objave
        })
      })
    }

      
  }
  prikaz(){
    this.setState({
      showMe:!this.state.showMe
    })
  }
  render() {
    //console.log({objava:this.state.objave})
    return (
      
        <div class='divsaokvirom'>
            {/* <h4>Sedmica:{this.props.sedmice}</h4> */}
            <h4 class='naslov'>{this.props.naslov}</h4>
            {this.state.objave.map(file => <ObjavaStudent idpredmeta={this.props.idpredmeta} naslov={file.naziv} opisMaterijala={file.opis} fileovi={file.datoteke} datumobjave={file.datum}></ObjavaStudent>)}
            {this.state.objave1.map(file => <ObjavaProfesor idpredmeta={this.props.idpredmeta}naslov={file.naziv} opisMaterijala={file.opis} fileovi={file.datoteke} datumobjave={file.datum}></ObjavaProfesor>)}
            {
              this.state.showMe?
              <DodavanjeObjave/>
              :null
            }
            <button type="button" onClick={()=>this.prikaz()} class="btn btn-primary" id="dodajObjavu">Dodaj objavu</button>
        </div>
    );
  }
}

export default sedmica;