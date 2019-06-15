import React, { Component } from 'react'
import axios from 'axios'
import Dropdown from './dropdown'
import ObjaveProfesor from './ObjaveProfesor'

class StranicaPredmetaUredjivanje extends Component {

    state={
      naziv: "",
      godine: [],
      nazivAg: this.props.akademskaGodina,
    }

    componentDidMount(){
      axios.get(`http://localhost:31907/r5/dajNaziv/${this.props.idPredmeta}`).then(res =>{
        this.setState({
          naziv: res.data.naziv
        })
    })
    axios.get(`http://localhost:31907/r8/getAkademskaGodina/`).then(res =>{  
      this.setState({
        godine:res.data.godine
      })
    })
  }

  render() {

    return (
      <div>
        <div>
          <h1 class="naslovPredmeta">{this.state.naziv}</h1>
        </div><br></br>
        <div>
          <Dropdown godine={this.state.godine} nazivAg = {this.props.akademskaGodina} idKorisnika={this.props.idKorisnika} idPredmeta={this.props.idPredmeta}/>
        </div>
        <ObjaveProfesor idPredmeta={this.props.idPredmeta} akademskaGodina={this.props.akademskaGodina}></ObjaveProfesor>
      </div>
    )
  }
}

export default StranicaPredmetaUredjivanje