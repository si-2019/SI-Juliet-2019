import React, { Component} from 'react'
import SviPredmeti from './SviPredmeti';
import axios from 'axios';


class semestarPredmeti extends Component {

  state={
    predmeti: [],
    korisnik: 1
  }

  ucitaj(props){
    let { ciklus, odsjek, semestar } = props.match.params;
    axios.get(`http://localhost:31907/r1/predmeti/${ciklus}/${odsjek}/${semestar}`).then(res => {
      const predmeti = res.data;
      this.setState({
        predmeti:predmeti.predmeti
      });
    })
  }

  componentDidMount(){
    this.ucitaj(this.props)
  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }
	 
  render() {

    return(
      <div style={{
        overflowY: "scroll",
        height: "100%",
        position: "absolute",
        width: "100%"
      }}>
        <SviPredmeti predmeti={this.state.predmeti} idKorisnika={this.state.korisnik}/>
      </div>  
    )
  }
}

export default semestarPredmeti