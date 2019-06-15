import React, { Component } from 'react';
import axios from 'axios';
import SviPredmeti from './SviPredmeti';

class mojiPredmeti extends Component {

  state={
    korisnik:this.props.match.params.idKorisnika,
    mojiPredmeti: [],
    predmeti: []
  }

  componentDidMount(){
    axios.get(`http://localhost:31907/r1/uloga/${this.state.korisnik}`).then(res => {
      const uloga = res.data;
        axios.get(`http://localhost:31907/r1/dajPredmeteZaNastavniAnsambl/${this.state.korisnik}?uloga=${uloga.uloga}`).then(res2 =>{
          this.setState({
            predmeti: res2.data.predmeti
          });
        })
    })
    axios.get(`http://localhost:31907/r1/mojiPredmeti/${this.state.korisnik}`).then(res =>{
      this.setState({
        mojiPredmeti: res.data.predmeti,
      });
    })
  }

  render() {
     return (      
        <div id='mojiPredmeti' style={{
          overflowY: "scroll",
          height: "100%",
          position: "absolute",
          width: "100%"
        }}>
            <h1>Moji predmeti</h1>
            <SviPredmeti predmeti={this.state.predmeti} idKorisnika={this.state.korisnik}/>
            <SviPredmeti predmeti={this.state.mojiPredmeti} idKorisnika={this.state.korisnik}/>
        </div>
    );
  }
}

export default mojiPredmeti;