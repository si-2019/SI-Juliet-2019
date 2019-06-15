import React, { Component } from 'react'
import axios from 'axios'
import OPredmetuStudent from './oPredmetuStudent'
import LiteraturaStudent from './literaturaStudent'
import ObjavaStudent from './objavaStudent'
import Sedmica from './sedmica'
import Dropdown from './dropdown'

class stranicaPredmetaStudent extends Component {

    state = {
      idPredmeta: 0,
      idKorisnika: 0,
      dodano: 0,
      text: "",
      naziv: "",
      sedmice: [],
      oPredmetu: [],
      literatura: [],
      objave: [],
      niz: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      dropdownAk: [],
      nazivAkademskeGodine: ""
    }
  
    componentDidMount(){
      axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res10 => {
      axios.get(`http://localhost:31907/r1/semestar/${this.props.match.params.idPredmeta}`).then(res4 =>{
        axios.get(`http://localhost:31907/r5/dajNaziv/${this.props.match.params.idPredmeta}`).then(res =>{
            const naziv = res.data.naziv;
            axios.get(`http://localhost:31907/r8/getAkademskaGodina`).then(res =>{
              const dropdownAkademske = res.data.godine
              console.log(res.data.godine)
            axios.get(`http://localhost:31907/r1/sedmice/${res4.data.semestar}`).then(res3 => {
              const sedmicee = res3.data.sedmice
              axios.get(`http://localhost:31907/r6/provjera/${this.props.match.params.idKorisnika}/${this.props.match.params.idPredmeta}`).then(res2 =>{
                axios.get(`http://localhost:31907/r3/dajOPredmetu/${this.props.match.params.idPredmeta}`).then(res5 =>{
                  axios.get(`http://localhost:31907/r3/dajLiteraturu/${this.props.match.params.idPredmeta}`).then(res6 =>{
                      const odg = res2.data;
                      let tekst = "";
                      if(res2.data.veza == '1'){
                      tekst='Ukloni iz mojih predmeta'
                      }
                      else{
                        tekst='Dodaj u moje predmete'
                      }
                      this.setState({
                        naziv: naziv,
                        idPredmeta: this.props.match.params.idPredmeta,
                        idKorisnika:this.props.match.params.idKorisnika,
                        dodano: res2.data.veza,
                        text: tekst,
                        sedmice: sedmicee,
                        oPredmetu: res5.data.file,
                        literatura: res6.data.file,
                        dropdownAk: dropdownAkademske,
                        nazivAkademskeGodine: res10.data.naziv
                      })
                      console.log(this.state)
                    })
                  })
                })
              })
            }) 
        })
       })
      })
        
    }

    klikNaDugme = () => {
        if(this.state.dodano==0){
          axios.post(`http://localhost:31907/r1/dodajMojPredmet/${this.props.match.params.idKorisnika}/${this.props.match.params.idPredmeta}`).then(res => {
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
          axios.get(`http://localhost:31907/r6/obrisi/${this.props.match.params.idKorisnika}/${this.props.match.params.idPredmeta}`).then(res => {
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




    render(){
        return(
            <div> 
              <div class='row'>
                <div class='col-9'>
                  <h1>  {this.state.naziv}</h1>
                </div>
                <div class='col-3'>
                  <button id='dd'type="button" class="btn btn-primary" onClick={this.klikNaDugme}>{this.state.text}</button>
                </div>
              </div>
              <div>
                  <Dropdown godine={this.state.dropdownAk} nazivAg={this.state.nazivAkademskeGodine} idPredmeta={this.props.match.params.idPredmeta} idKorisnika={this.props.match.params.idKorisnika}/>
                </div>
              <OPredmetuStudent predmet={this.state.oPredmetu} idpredmeta={this.state.idPredmeta}></OPredmetuStudent>
              <LiteraturaStudent nesto={this.state.literatura}></LiteraturaStudent>
              {this.state.sedmice.map(sedmica => <Sedmica idpredmeta={this.state.idPredmeta} naslov={sedmica.pocetakSedmice+' - '+sedmica.krajSedmice}  sedmice={sedmica.redniBrojSedmice} idPredmet={this.props.match.params.idPredmeta} student="student"></Sedmica>)}

              
              {/* {this.state.objave.map(file => [<a href='#' class='card-link' key='6'>{file.naziv}</a>,<br key='7'></br>])} */}
            </div>
        )
    }
}

export default stranicaPredmetaStudent