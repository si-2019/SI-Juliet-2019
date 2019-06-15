import React, { Fragment, Component } from 'react';

import GrafikStavka from './GrafikStavka.js';

import { dataPredmetPoGodini } from '../../api.js';
import { Spinner } from 'reactstrap';

class UkupniBrojPoPredmetu extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        let { predmetId, godinaId } = this.props;
        dataPredmetPoGodini.get(predmetId, godinaId, "Bodovi").then( data => {
            this.setState({
                data: data
            });
        })
    }
    render(){
        return (this.state.data ? 
            <GrafikStavka
                data={this.state.data}
                nazivStavke="Bodovi"
                tipGrafika='Line'
            /> :
            <Spinner />)
    }
}

export default UkupniBrojPoPredmetu;