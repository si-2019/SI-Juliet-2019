import React, { Component } from "react";
import axios from "axios";

class TabelaSortiranaPoBrojuIspita extends Component {
    state = {
        sortiraniPredmetiPoBrojuIspita: [],
        brojIspita: [],
        trenutnoLogovaniStudentID: 100
    };

    componentDidMount() {
        axios
            .get(
                `http://localhost:31918/predmeti/brojIspita/` +
                this.state.trenutnoLogovaniStudentID + "/sort"
            )
            .then(res => {
                if (res.data.ispiti != undefined) {
                    const sortiraniPredmeti = res.data.ispiti.map(obj => obj.naziv);
                    const brojIspita = res.data.ispiti.map(obj => obj.brojPolaganja);
                    this.setState({ sortiraniPredmetiPoBrojuIspita: sortiraniPredmeti, brojIspita: brojIspita });
                }
            });
    }

    render() {
        return (
            <div className="col-sm-12 col-xs-12 col-md-12 col-lg-4">
                {this.state.sortiraniPredmetiPoBrojuIspita.length == 0 ? <span style={{ float: "left", marginLeft: "30px" }}>Student nije polagao nijedan ispit</span> :
                    <table className="table table-bordered text-center bg-active border-solid" style={{ float: "left", marginLeft: "20px" }}>
                        <tbody>
                            <tr class="bg-primary text-light">
                                <th class="tabtip">Predmet</th>
                                <th class="tabtip">Broj polaganih ispita</th>
                            </tr>
                            {this.state.sortiraniPredmetiPoBrojuIspita.map((item, i) => (
                                <tr className="tabtip1" key={i}>
                                    <td>{item}</td>
                                    <td>{this.state.brojIspita[i]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default TabelaSortiranaPoBrojuIspita;