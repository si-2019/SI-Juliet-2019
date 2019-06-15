import React, { Fragment, Component } from 'react';

import GrafikStavka from './GrafikStavka.js';

import { dataPredmetPoGodini } from '../../api.js';
import { Spinner } from 'reactstrap';

class OcjenePoPredmetu extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        let { predmetId, godinaId } = this.props;
        dataPredmetPoGodini.get(predmetId, godinaId, "Ocjena").then( data => {
            this.setState({
                data: data
            });
        })
    }
    render(){
        return (this.state.data ? 
            <GrafikStavka
                data={this.state.data}
                nazivStavke='Ocjena'
                tipGrafika='Pie'
            /> :
            <Spinner />)
    }
}

export default OcjenePoPredmetu;