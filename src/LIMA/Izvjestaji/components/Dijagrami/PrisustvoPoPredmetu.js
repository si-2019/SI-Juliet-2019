import React, { Fragment, Component } from 'react';

import GrafikStavka from './GrafikStavka.js';

import { dataPredmetPoGodini } from '../../api.js';
import { Spinner } from 'reactstrap';

class PrisustvoPoPredmetu extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        let { predmetId, godinaId } = this.props;
        dataPredmetPoGodini.get(predmetId, godinaId, "Prisustvo").then( data => {
            this.setState({
                data: data
            });
        })
    }
    render(){
        return (this.state.data ? 
            <GrafikStavka
                data={this.state.data}
                nazivStavke='Prisustvo'
                tipGrafika='Bar'
            /> :
            <Spinner />)
    }
}

export default PrisustvoPoPredmetu;