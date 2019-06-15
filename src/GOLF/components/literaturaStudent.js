import React, { Component } from 'react';
import ObjavaStudent from './objavaStudent.js'
import axios from 'axios'

class LiteraturaStudent extends Component {

  state={
    objave: []
  }

  ubicuseopet(props){
    axios.get(`http://localhost:31907/r3/dajLiteraturuZaStudenta/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res =>{
      this.setState({
        objave: res.data.objave
            })
  })

  }

  componentWillReceiveProps(props){
    this.ubicuseopet(props)
  }

 render(){


    return (
        <div class="divsaokvirom">
        	<h4 class='naslov'>Literatura</h4>
          {this.state.objave.map(file => <ObjavaStudent idpredmeta={this.props.idpredmeta} naslov={file.naziv} opisMaterijala={file.opis} fileovi={file.datoteke} datumobjave={file.datum}></ObjavaStudent>)}
        </div>
        
    );
  }
}

export default LiteraturaStudent