import React, { Component} from 'react'
import Dropdown from './dropdown'
import axios from 'axios'
import'./golf.css'

class PrethodnaAkademskaGodina extends Component {

    state = {
        godine: []
    }
    componentDidMount(){
        axios.get(`http://localhost:31907/r8/getAkademskaGodina`).then(res =>{
            this.setState({
                godine:res.data.godine
            })
        })
    }

    render(){
        return(
            <div>
                    <Dropdown godine={this.state.godine} nazivAg={this.props.match.params.naziv} idPredmeta={this.props.match.params.idPredmeta} idKorisnika={this.props.match.params.idKorisnika}/>
            </div>
        )
    }
}

export default PrethodnaAkademskaGodina