import React, { Component } from 'react';
import axios from 'axios'
import './golf.css'
class oPredmetuStudent extends Component {

  constructor(props){
    super(props)
    this.state={
      objave: {},
      fileovi: []
    }
  }

  ucitaj(props){
    axios.get(`http://localhost:31907/r3/dajOPredmetu/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res =>{
      console.log(res.data.objave[0])
      this.setState({
        objave: res.data.objave[0],
        fileovi: res.data.objave[0].datoteke
      })
      console.log(this.state)
  })
  }

  componentDidMount(){
    axios.get(`http://localhost:31907/r3/dajOPredmetu/${this.props.idPredmeta}/${encodeURIComponent(this.props.naziv)}`).then(res =>{
      console.log(res.data.objave[0])
      this.setState({
        objave: res.data.objave[0],
        fileovi: res.data.objave[0].datoteke
      })
      console.log(this.state)
  })

  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }


  render() {
  
    return (
        
        <div class='divsaokvirom'>
            <h4 class='naslov'> O predmetu </h4>
            <div class="card" id="objava">
              <div class="card-body">
                <div>{this.state.objave.opis}</div>
                {this.state.fileovi.map(file => [<a href={'http://localhost:31907/r1/dajFile?id='+file.id} target="_blank" class='card-link'>{file.naziv}</a>,<br></br>])}
              </div>
            </div>
        </div>
    );
  }
}

export default oPredmetuStudent;