import React, { Component } from 'react'
import OPredmetuProfesor from './oPredmetuProfesor'
import LiteraturaProfesor from './literaturaProfesor'
import Sedmica from './sedmica'
import axios from 'axios'
import Dropdown from './dropdown'
import DodavanjeLiterature from './dodavanjeLiterature'
class stranicaPredmetaProfesor extends Component {
    constructor(props){
        super(props);
        this.state = {          
          idPredmeta: props.match.params.idPredmeta,
          naziv: "",
          sedmice: [],
          niz : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
          file : [],
          oPredmetu: [],
          literatura: [],
          objave: [],
          dropdownAk: [],
          nazivAg: ""
        };
    }    
    componentDidMount(){
        axios.get(`http://localhost:31907/r5/dajNaziv/${this.state.idPredmeta}`).then(res =>{
          axios.get(`http://localhost:31907/r8/getAkademskaGodina/`).then(res =>{
              const dropdownAkademske = res.data.godine
            axios.get(`http://localhost:31907/r1/semestar/${this.state.idPredmeta}`).then(res2 =>{
                axios.get(`http://localhost:31907/r1/sedmice/${res2.data.semestar}`).then(res3 => {
                    axios.get(`http://localhost:31907/r3/dajOPredmetu/${this.state.idPredmeta}`).then(res4 =>{
                        axios.get(`http://localhost:31907/r3/dajLiteraturu/${this.state.idPredmeta}`).then(res5 =>{
                                this.setState({
                                    naziv:res.data.naziv,
                                    sedmice: res3.data.sedmice,
                                    oPredmetu: res4.data.file,
                                    literatura: res5.data.file,
                                    dropdownAk: dropdownAkademske
                                }) 
                    })
                    
                })
            })
         
        })
    })
  })
  axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res10 => {
        this.setState({
            nazivAg: res10.data.naziv
        })
  })
}
    render(){
        return(
            <div>
                <h1>{this.state.naziv}</h1>
                <div>
                  <Dropdown godine={this.state.dropdownAk} nazivAg = {this.state.nazivAg}/>
                </div>
                <OPredmetuProfesor predmet={this.state.oPredmetu} idpredmeta={this.state.idPredmeta}></OPredmetuProfesor>
                <LiteraturaProfesor nesto={this.state.literatura}></LiteraturaProfesor>
              {this.state.sedmice.map(sedmica => <Sedmica idpredmeta={this.state.idPredmeta} naslov={sedmica.pocetakSedmice+' - '+sedmica.krajSedmice} sedmice={sedmica.redniBrojSedmice} idPredmet={this.state.idPredmeta} student="nesto"></Sedmica>)}
              {this.state.objave.map(objave =>  <Sedmica objava={this.state.objave}></Sedmica>)}
            </div>
        )
    }
}

export default stranicaPredmetaProfesor
