import React, { Component } from 'react';
import Header from '../Headers/Header2';
import Footer from '../Footer/Footer';
import TabelaStudenti from '../TabelaStudenti/TabelaStudenti';
import { dajPredmetPoId } from '../../mock/mock';


class StranicaPredmeta extends Component {
  state = {
    predmet: null,
    grupaId: null
  }
  async componentDidMount(){
    const predmetId = Number(this.props.match.params.predmetId)
    const params = new URLSearchParams(this.props.location.search);
    const grupaId = Number(params.get('grupaId'))
    console.log(predmetId, grupaId)
    const predmet = await dajPredmetPoId(predmetId, grupaId)
    this.setState({
      predmet,
      grupaId
    })
  }
  render() {
    const {predmet, grupaId} = this.state
    if(!predmet) return (<div>Loading...</div>)
    const studenti = predmet.grupe.map(g => g.studenti).flat()
    console.log(studenti)
    return (
      <div className="StranicaPredmeta">
        <Header isPocetna={false}/>
        <br />
        <h1>Stranica predmeta</h1>
        <p>Predmet: {predmet.name}</p>
        {
          grupaId && predmet.grupe.length > 0? <p>Grupa: {predmet.grupe[0].name}</p>: null
        }
        <br />
        <TabelaStudenti studenti={studenti}/>
        <Footer/>
      </div>
    );
  }
}

export default StranicaPredmeta;