import React, { Component } from 'react'
import axios from 'axios'
import OPredmetuProfesor from './oPredmetuProfesor'
import LiteraturaProfesor from './literaturaProfesor'
import SedmicaProfesor from './SedmicaProfesor'

class ObjaveProfesor extends Component {

  constructor(props){
    super(props)
    this.state={
      naziv: props.akademskaGodina,
      sedmice: []
    }
  }

  ucitaj(props){
    axios.get(`http://localhost:31907/r1/semestar/${this.props.idPredmeta}`).then(res =>{
      axios.get(`http://localhost:31907/r1/sedmice/${res.data.semestar}/${encodeURIComponent(props.akademskaGodina)}`).then(res2 => {
        this.setState({
          sedmice: res2.data.sedmice
        })
        console.log(this.state)
  })
    })
  }

  componentDidMount(){
    axios.get(`http://localhost:31907/r1/semestar/${this.props.idPredmeta}`).then(res =>{
      axios.get(`http://localhost:31907/r1/sedmice/${res.data.semestar}/${encodeURIComponent(this.props.akademskaGodina)}`).then(res2 => {
        this.setState({
          sedmice: res2.data.sedmice
        })
        console.log(this.state)
  })
    })
  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }



  render() {

    return (
      <div>
        <OPredmetuProfesor naziv={this.props.akademskaGodina} idPredmeta={this.props.idPredmeta}></OPredmetuProfesor>
        <LiteraturaProfesor naziv={this.props.akademskaGodina} idPredmeta={this.props.idPredmeta}></LiteraturaProfesor>
        {this.state.sedmice.map(sedmica => <SedmicaProfesor idpredmeta={this.props.idPredmeta} naslov={sedmica.pocetakSedmice+' - '+sedmica.krajSedmice}  sedmice={sedmica.redniBrojSedmice} idPredmet={this.props.idPredmeta} naziv={this.props.akademskaGodina}></SedmicaProfesor>)}
      </div>
    )
  }
}

export default ObjaveProfesor