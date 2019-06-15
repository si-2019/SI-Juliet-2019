import React, { Component } from 'react'
import axios from 'axios'
import Dropdown from './dropdown.js'
import ObjaveStudent from './ObjaveStudent'

class StranicaPredmetaPregled extends Component {

  constructor(props){
    super(props)
    this.state={
      naziv: "",
      godine: [],
      nazivAg: props.akademskaGodina,
      text: ""}
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

  axios.get(`http://localhost:31907/r6/provjera/${this.props.idKorisnika}/${this.props.idPredmeta}`).then(res2 =>{
  let tekst = ""  
  if(res2.data.veza == '1'){
      tekst='Ukloni iz mojih predmeta'
      }
      else{
        tekst='Dodaj u moje predmete'
      }
      this.setState({
        text: tekst
      })
})

}

klikNaDugme = () => {
  if(this.state.dodano==0){
    axios.post(`http://localhost:31907/r1/dodajMojPredmet/${this.props.idKorisnika}/${this.props.idPredmeta}`).then(res => {
      if(res.data.message=='OK'){
        let tekst = 'Ukloni iz mojih predmeta'
        let dodano = 1
        this.setState({
          text:tekst,
          dodano:dodano
        })
      }
    })
  }
  else{
    axios.get(`http://localhost:31907/r6/obrisi/${this.props.idKorisnika}/${this.props.idPredmeta}`).then(res => {
      if(res.data.obrisano==1){
        let tekst = 'Dodaj u moje predmete'
        let dodano = 0
        this.setState({
          text:tekst,
          dodano:dodano
        })
      }
    })
  }
}

render() {

  return (
    <div>
      <div class="row">
        <div class="col-9">
          <h1 class="naslovPredmeta">{this.state.naziv}</h1>
        </div>
        <div class="col-3">
           <button id='dd'type="button" class="btn btn-primary" onClick={this.klikNaDugme}>{this.state.text}</button>
        </div>
      </div>
      <div>
        <Dropdown godine={this.state.godine} nazivAg = {this.props.akademskaGodina} idKorisnika={this.props.idKorisnika} idPredmeta={this.props.idPredmeta}/>
      </div>

      <ObjaveStudent idPredmeta={this.props.idPredmeta} akademskaGodina={this.props.akademskaGodina}></ObjaveStudent>
    </div>

    
  )
}
}

export default StranicaPredmetaPregled
