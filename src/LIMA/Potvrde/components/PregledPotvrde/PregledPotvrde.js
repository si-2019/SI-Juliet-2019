import React, { Component } from 'react';

import { potvrde } from '../../api.js';

class PregledPotvrde extends Component {
    constructor(){
        super();
        this.state = {
            student: null,
            detaljiOPohadjanju: null,
            detaljiOFakultetu: null,
            svrha: null,
            datumObrade:null,
        };
    }
    componentDidMount(){
        potvrde.get(this.props.match.params.potvrdaId).then( data => {
            this.setState(data);
        })
    }
    render(){
        if(!this.state.student){
            return (
                <div> loading... </div>
            );
        }
        let { 
            ime, 
            prezime, 
            brojIndeksa, 
            datumRodjenja, 
            mjestoRodjenja, 
            opcinaRodjenja, 
            drzavaRodjenja 
        } = this.state.student;
        let {
            kojiPut,
            akademskaGodina,
            semestar,
            ciklus,
            tipStudenta,
            smjer,
            tipStudija
        } = this.state.detaljiOPohadjanju;
        let {
            dekan,
            // adresa, url loga, telefon ??? da nije predefined slika
        } = this.state.detaljiOFakultetu;
        let {
            svrha,
            datumObrade
        } = this.state;
        return  (
            <div style={{
                    width: '740px', 
                    padding: '20px', 
                    boxSizing: 'border-box', 
                    fontSize: 12, 
                    backgroundColor: 'white',
                }}> 
                <img className='pb-4' src={require('../../static/memorandum.png')} alt='Nema slike!'/>
                <p>Na osnovu člana 169. stav (2) Zakona o upravnom postupku FBiH (Službene novine FBiH, broj 2/98, 48/99), člana 140. Zakona o visokom obrazovanju (Službene novine Kantona Sarajevo, broj 33/17) i člana 239. Statuta Univerziteta u Sarajevu, izdaje se:</p>   
                <h3 style={{textAlign: 'center'}}>P O T V R D A</h3>
                <table><tbody>
                    <tr>
                        <td>Ime i prezime studenta:</td>
                        <td><strong>{`${ime} ${prezime}`}</strong></td>
                    </tr>
                    <tr>
                        <td>Broj indeksa:</td>
                        <td><strong>{brojIndeksa}</strong></td>
                    </tr>
                    <tr>
                        <td>Datum rođenja:</td>
                        <td><strong>{datumRodjenja}</strong></td>
                    </tr>
                    <tr>
                        <td>Mjesto rođenja:</td>
                        <td><strong>{mjestoRodjenja}</strong></td>
                    </tr>
                    <tr>
                        <td>Općina rođenja:</td>
                        <td><strong>{opcinaRodjenja}</strong></td>
                    </tr>
                    <tr>
                        <td>Država rođenja:</td>
                        <td><strong>{drzavaRodjenja}</strong></td>
                    </tr>
                </tbody></table>
                <br />
                <p>Potvrđuje se da je {`${ime} ${prezime}`} upisan {kojiPut}. put u akademskoj {akademskaGodina} godini u {semestar} semestar - {ciklus} ciklus kao {tipStudenta} student, na studiju {smjer} ({tipStudija}).</p>
                
                <p>Ova potvrda se izdaje u svrhu {svrha}, te se u druge svrhe ne može koristiti.</p>

                <br />

                <p>Sarajevo, {datumObrade} godine</p>

                <p>Broj protokola: 11-</p>

                <table width='100%'><tbody>
                    <tr >
                        <td width='60%'></td>
                        <td width='40%' align='center'>
                        <p>
                            DEKAN
                            <br />
                            <br />
                            {dekan}
                        </p>
                        </td>
                    </tr>
                </tbody></table>
            </div>
        )    
    }
}

export default PregledPotvrde;