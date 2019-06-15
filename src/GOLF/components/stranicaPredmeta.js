import React, { Component } from 'react'
import axios from 'axios'
import StranicaPredmetaUredjivanje from './StranicaPredmetaUredjivanje.js'
import StranicaPredmetaPregled from './StranicaPredmetaPregled.js'


class StranicaPredmeta extends Component {

state = {
    mozeUredjivati: false,
    akademskaGodina: decodeURIComponent(this.props.match.params.nazivAG),
    trenutnaAkademskaGodina: decodeURIComponent(this.props.match.params.nazivAG)
}

componentDidMount(){
  axios.get(`http://localhost:31907/r3/dajPrivilegije/${this.props.match.params.idKorisnika}/${this.props.match.params.idPredmeta}`).then(res => {
    this.setState({
        mozeUredjivati: res.data.privilegija
    })
})
}

componentWillReceiveProps(props){
  this.setState({
    akademskaGodina: decodeURIComponent(props.match.params.nazivAG),
    trenutnaAkademskaGodina: decodeURIComponent(props.match.params.nazivAG)
  })
}



  render() {

    return (
      <div style={{
                      overflowY: "scroll",
                      height: "100%",
                      position: "absolute",
                      width: "100%"
                    }}>
        {this.state.mozeUredjivati ? <StranicaPredmetaUredjivanje akademskaGodina={this.state.akademskaGodina} trenutnaAkademskaGodina={this.state.trenutnaAkademskaGodina} idPredmeta={this.props.match.params.idPredmeta} idKorisnika={this.props.match.params.idKorisnika}/> : <StranicaPredmetaPregled akademskaGodina={this.state.akademskaGodina} trenutnaAkademskaGodina={this.state.trenutnaAkademskaGodina} idPredmeta={this.props.match.params.idPredmeta} idKorisnika={this.props.match.params.idKorisnika} />}
      </div>
    )
  }
}

export default StranicaPredmeta
