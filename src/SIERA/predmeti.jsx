import React, { Component } from 'react';
import axios from 'axios';
import "./bootstrap.min.css";

import ListaTrenutnihPredmeta from "./listaTrenutnihPredmeta";
import ListaOdslusanihPredmeta from "./listaOdslusanihPredmeta";

class Predmeti extends Component {
    state = {}
    render() {
        return (
            <div className="container-fluid" style={{ marginTop: "30px" }}>
                <h2 style={{ marginBottom: "30px" }}>Predmeti</h2>
                <div className="d-flex align-items-center" style={{ flexDirection: "column" }}>
                    <div className="row">
                        <div className="col-lg-6 col-md align-self-stretch" style={{ boxSizing: "border-box", padding: "10px" }}>
                            <div className="d-flex justify-content-center">
                                <h4>Lista trenutnih predmeta</h4>
                            </div>
                            <div className="d-flex justify-content-start">
                                <ListaTrenutnihPredmeta />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md align-self-stretch" style={{ boxSizing: "border-box", padding: "10px" }}>
                            <div className="d-flex justify-content-center">
                                <h4>Lista odslusanih predmeta</h4>
                            </div>
                            <div className="d-flex justify-content-start">
                                <ListaOdslusanihPredmeta />
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Predmeti;