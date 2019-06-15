import React from 'react';
import url from '../url'

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
            <div>          
            <h1>Prikaz svih anketa</h1>

            <br></br>
            <table className="table table-bordered text-center bg-active border-solid" align="center">

                {
                    items.ankete ? Object.keys(items.ankete).map(key => {
                        console.log(items.ankete)
                        let header = [(
                            <tr>
                                <td colspan="6">{items.ankete[key].nazivPredmeta}</td>
                            </tr>
                        ),
                        (
                            <tr className="bg-primary text-light">
                                <td class="tabtip">Naziv ankete</td>
                                <td class="tabtip">Opis</td>
                                <td class="tabtip">Datum isteka</td>
                                <td class="tabtip">Prikaz ankete</td>
                                <td class="tabtip">Uredi</td>
                                <td class="tabtip">Obriši</td>
                            </tr>
                        )
                        ]

                        let ankete = items.ankete[key].ankete
                        return header.concat(ankete.map(anketa => (
                            <tr>
                            <th class="tabtip1">{anketa.naziv}</th>
                            <th class="tabtip1">{anketa.opisAnkete}</th>
                            <th class="tabtip1">{anketa.datumIstekaAnkete.substr(0,10)}</th>
                            <th class="tabtip1"><a href={"/Hotel/rezultati/" + anketa.idAnketa}><button type="button" class="btn btn-primary disabled" id="prikaziButton">Prikaži</button></a></th>
                            <th class="tabtip1"><button type="button" class="btn btn-primary disabled" id="urediButton">Uredi</button></th>
                            <th class="tabtip1"><button type="button" class="btn btn-primary disabled" id="obrisiButton" 
                                onClick= {() => this.obrisiAnketu(anketa) }>Obriši</button></th>
                            </tr>
                        )))
                    }) : "Loading..."
                }
                
                
                </table>
            </div>
        )
    }
    componentDidMount() { 
        fetch(url + '/dajSveAnketePoPredmetima', {
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