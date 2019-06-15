import React from "react";
import axios from "axios";
import "./tabela.css"

class Ocjene extends React.Component {

    constructor() {
        super();
        this.state = {
            dummyOcjene: [],
            idStudenta: 1
        }
    }
    componentDidMount() {
        axios
            .get("http://localhost:31918/ocjene/" + this.state.idStudenta)
            .then(res => {
                this.setState({
                    dummyOcjene: res.data.ocjene
                })
                console.log(res.data.ocjene);
            })
            .catch(res => {
                console.log(res.error);
            });
    }
    render() {
        var niz = this.state.dummyOcjene ? [{
            AkademskaGodina: "2017",
            Ocjene: [{
                Predmet: "lol",
                Ocjena: "6"
            }, {
                Predmet: "ney",
                Ocjena: "lmao"
            }]
        }, {
            AkademskaGodina: "2019",
            Ocjene: [{
                Predmet: "maca",
                Ocjena: "10"
            }]
        }] : this.state.dummyOcjene;
        return (
            <div style={{ marginTop: "30px" }}>
                <h2 style={{ marginBottom: "30px" }}>Ocjene po godinama</h2>
                <div className="row" style={{ padding: "20px" }}>
                    {niz.map(x =>
                        <div className="col-sm-12 col-xs-12 col-md-12 col-lg-4">
                            <table className="table table-bordered text-center bg-active border-solid" style={{ float: "left", marginLeft: "20px" }}>
                                <tbody>
                                    <tr className="bg primary text-light">
                                        <th className="tabtip" colSpan="2">Akademska godina {x.AkademskaGodina}</th>
                                    </tr>
                                    <tr className="bg-primary text-light">
                                        <th className="tabtip">Predmet</th>
                                        <th className="tabtip">Ocjena</th>
                                    </tr>
                                    {x.Ocjene.map(y =>
                                        <tr className="tabtip1">
                                            <td>{y.Predmet}</td>
                                            <td>{y.Ocjena}</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            </div>
        );
    }
}

export default Ocjene;