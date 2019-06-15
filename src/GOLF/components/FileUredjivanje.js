import React, { Component } from 'react'
import axios from 'axios'

class FileUredjivanje extends Component {

    state={
        klasa: "btn btn-danger",
        tekst: "Obriši",
        obrisano: false
    }

    obrisi(){
        axios.delete(`http://localhost:31907/r1/obrisiFile/${this.props.id}`)
        if(!this.state.obrisano){
            this.setState({
                tekst: "Obrisano",
                klasa: "btn btn-danger disabled",
                obrisano: true
            })
        }
    }
  render() {
    return (
        <div>
        <a href={'http://localhost:31907/r1/dajFile?id='+this.props.id} target="_blank" class='card-link'>{this.props.naziv}</a> <button type="button" class="btn btn-danger btn-sm" onClick={() => this.obrisi()}>{this.state.tekst}</button>
        </div>
    )
  }
}

export default FileUredjivanje
