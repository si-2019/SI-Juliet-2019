import React from 'react';
import url from '../url'
import './stil.css';
import {Link} from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        }
        this.obrisiAnketu = this.obrisiAnketu.bind(this)
    }
    render() {
        const items = this.state.items
        return (
            <div className="okvirListe">
                <div className="naslovliste"><h1>Moje ankete</h1></div>
            
            <br></br>
            <table className="table-bordered text-center bg-active border-solid tabelaLista" align="center">
                <tr className="bg-primary text-light">
                <td class="tabtip">Naziv ankete</td>
                <td class="tabtip">Opis</td>
                <td class="tabtip">Datum isteka</td>
                <td class="tabtip">Prikaz ankete</td>
                <td class="tabtip">Uredi</td>
                <td class="tabtip">Obriši</td>
                </tr>
                
                {items.ankete ? items.ankete.map(anketa => (
                    
                  
                                <tr>
                                <th class="tabtip1">{anketa.naziv}</th>
                                <th class="tabtip1">{anketa.opisAnkete}</th>
                                <th class="tabtip1">{anketa.datumIstekaAnkete.substr(0,10)}</th>
                                <th class="tabtip1"><Link to={"/Hotel/rezultati/" + anketa.idAnketa}><button type="button" class="btn btn-primary" id="prikaziButton">Rezultati</button></Link></th>
                                <th class="tabtip1"><Link to={"/hotel/uredi/" + anketa.idAnketa}><button type="button" class="btn btn-primary" id="urediButton">Uredi</button></Link></th>
                                <th class="tabtip1"><button type="button" class="btn btn-danger" id="obrisiButton" 
                                onClick= {() => this.obrisiAnketu(anketa) }>Obriši</button></th>
                                </tr>

                           
                     
                    
                    
                )) : "Loading..."}
                </table>
            </div>
        )
    }
    componentDidMount() { 
        fetch(url + '/dajMojeAnkete?idNapravio=1', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                items: result
            })
        }, error => {
            this.setState({
                items: [error, "error"]
            })
        })
    }
    obrisiAnketu(anketaZaBrisanje){
        console.log("Morel")
        fetch(url + '/obrisiAnketu?idKorisnik=1&idAnketa=' + anketaZaBrisanje.idAnketa, { 
            method: 'POST'
        }).then(() => this.componentDidMount())
    }
}

export default App;