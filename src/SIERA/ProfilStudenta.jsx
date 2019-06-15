import React from "react";
import Fotografija from "./fotografija";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

class Profil extends React.Component {
    constructor() {
        super();
        this.state = {
            studentId: 1,
            fotka: null,
            ime: "Neko",
            prezime: "Nekic",
            mail: "lol",
            website: "lala",
            linkedIn: "isnjksd",
            mjRod: "sdkl",
            datRo: "no"
        }
    }
    componentDidMount() {
        const noviId = this.props.match.params.idStudenta;
        axios
            .get("http://localhost:31918/studenti/" + noviId)
            .then(res => {
                console.log(res.data[0]);
                this.setState({
                    ime: res.data[0].ime,
                    prezime: res.data[0].prezime,
                    studentId: res.data[0].id,
                    fotka: res.data[0].fotografija,
                    mail: res.data[0].email,
                    website: res.data[0].website,
                    linkedIn: res.data[0].linkedin,
                    mjRod: res.data[0].mjestoRodjenja,
                    datRo: res.data[0].datumRodjenja
                });
            }
            )
            .catch(res => {
                console.log(res.error);
            });
    }
    render() {
        return (
            <div class="row" style={{ margin: "0px" }}>
                <div class="col"></div>
                <div class="col">
                    <div className="card mb-3" style={{ minWidth: "300px", maxWidth: "500px" }}>
                        <h3 className="card-header">{this.state.ime} {this.state.prezime}</h3>
                        <Fotografija fotografija={this.state.fotka} />

                        <ul class="list-group list-group-flush" style={{ width: "100%", display: "inline-block" }}>
                            <li class="card-header">
                                Lični podaci
                        </li>
                            <li class="list-group-item" >
                                <div><span class="badge badge-info">Datum i mjesto rođenja</span></div>
                                {this.state.mjRod}
                                <br></br>
                                {this.state.datRo}
                            </li>
                            <li class="list-group-item">
                                <div><span class="badge badge-info" >Email</span></div>
                                {this.state.mail}
                            </li>
                            <li class="list-group-item">
                                Website:&nbsp;
                                <a href={this.state.website} class="card-link">{this.state.website}</a>
                            </li>
                            <li class="list-group-item">
                                LinkedIn: <a href={this.state.linkedIn} class="card-link">{this.state.linkedIn}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col"></div>

            </div>
        );
    }
}

export default Profil;