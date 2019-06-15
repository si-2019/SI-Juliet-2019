import React, { Component } from 'react';
import axios from 'axios';
class Ankete extends Component {  
    
    state = {konacnaOcj:""}


    async componentDidMount(){
     //hardkodirane vrijednosti
      const idStudent=1;
      const idPredmet=8;
      const {data} = await axios.get('http://localhost:31904/ocjena/'+idPredmet+'/'+idStudent); 
      this.setState({konacnaOcj:data})
      
    }

    render () {

        return(
            <div className="konacnaOcjena" style={{ width : 300, height: 'fit-content', padding:3 }}>
            <b>Konačna ocjena: </b>{ this.state.konacnaOcj}
            </div>
        );
    }
}

export default Ankete;