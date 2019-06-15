import React, { Component } from 'react'
import axios from 'axios'
import ObjavaStudent from './objavaStudent'

class SedmicaStudent extends Component {

  constructor(props){
    super(props);
    this.state={
      objave: []
    }
  }

  ucitaj(props){
    axios.get(`http://localhost:31907/r3/dajMaterijaleZaStudenta/${this.props.idPredmet}/${props.sedmice}/${encodeURIComponent(props.naziv)}`).then(res =>{
        this.setState({
          objave: res.data.objave
        })
        console.log(props.naziv)
        console.log(res.data.objave)
    })  
  }

  componentDidMount(){
      axios.get(`http://localhost:31907/r3/dajMaterijaleZaStudenta/${this.props.idPredmet}/${this.props.sedmice}/${encodeURIComponent(this.props.naziv)}`).then(res =>{
        this.setState({
          objave: res.data.objave
        })
    })  
  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }

  render() {
    return (
      
        <div class='divsaokvirom'>
            <h4 class='naslov'>{this.props.naslov}</h4>
            {this.state.objave.map(file => <ObjavaStudent idpredmeta={this.props.idpredmeta} naslov={file.naziv} opisMaterijala={file.opis} fileovi={file.datoteke} datumobjave={file.datum}></ObjavaStudent>)}
          </div>
    );
  }
}

export default SedmicaStudent