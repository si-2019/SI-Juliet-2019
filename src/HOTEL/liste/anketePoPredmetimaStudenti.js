import React from 'react';
import url from '../url';
import {Link} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        }
    }
    render() {
        const items = this.state.items
        return (
            <div className="okvirListe">
            <div className="naslovliste"><h1>Ankete po predmetima</h1></div>

            <br></br>
                <table className="tabelaLista table-bordered text-center bg-active border-solid" align="center">
                    <tr className="bg-primary text-light">
                    <td class="tabtip">Naziv ankete</td>
                    <td class="tabtip">Opis</td>
                    <td class="tabtip">Datum isteka</td>
                    <td class="tabtip">Prikaz ankete</td>
                    </tr>
            
                {items.ankete ? items.ankete.map(anketa => (
                    <tr>
                    <th class="tabtip1">{anketa.naziv}</th>
                    <th class="tabtip1">{anketa.opisAnkete}</th>
                    <th class="tabtip1">{anketa.datumIstekaAnkete.substr(0,10)}</th>
                    <th class="tabtip1"><a href={"/Hotel/popunjavanje/" + anketa.idAnketa}><button type="button" class="btn btn-primary" id="prikaziButton">Prikaži</button></a></th>
                    </tr>
                )) : "Loading..."}
                </table>
            </div>
        )
    }
    componentDidMount() { 
        fetch(url + '/dajAnketeNaPredmetimaZaStudenta?idStudent=1', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            console.log("hoce")
            this.setState({
                items: {
                ankete: result
              }
            })
        }, error => {
            this.setState({
                items: [error, "error"]
            })
        })
    }
}

export default App;