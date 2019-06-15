import React, { Component } from 'react'
import axios from 'axios'
import OPredmetuStudent from './oPredmetuStudent'
import LiteraturaStudent from './literaturaStudent'
import SedmicaStudent from './SedmicaStudent'

class ObjaveStudent extends Component {

  constructor(props){
    super(props)
    this.state={
      naziv: props.akademskaGodina,
      sedmice: [],
      prvi: true
    }
  }

  ubicuse(props){
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
    this.ubicuse(props)
    console.log(this.state)
  }

  render() {

    return (
      <div>
        <OPredmetuStudent naziv={this.props.akademskaGodina} idPredmeta={this.props.idPredmeta}></OPredmetuStudent>
        <LiteraturaStudent naziv={this.props.akademskaGodina} idPredmeta={this.props.idPredmeta}></LiteraturaStudent>
        {this.state.sedmice.map(sedmica => <SedmicaStudent idpredmeta={this.props.idPredmeta} naslov={sedmica.pocetakSedmice+' - '+sedmica.krajSedmice}  sedmice={sedmica.redniBrojSedmice} idPredmet={this.props.idPredmeta} naziv={this.props.akademskaGodina}></SedmicaStudent>)}

      </div>
    )
  }
}

export default ObjaveStudent