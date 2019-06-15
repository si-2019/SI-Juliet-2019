import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import PrikaziStatus from "./PrikaziStatus";

class DropDownZavrsni extends React.Component {

    constructor() {
        super();
        this.state = {
            profesori: [],
            teme: [],
            studentId: 1,
            profId: 1,
            temaId: null,
            otvori: false,
            selProf: null,
            selTema: null,
            greskaVisible: "hidden",
            selectClass: "custom-select"
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeProf = this.handleChangeProf.bind(this);
        this.otvori = this.otvori.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.validateTema = this.validateTema.bind(this);
    }
    otvori() {
        try {
            let trenutniProf = this.state.profesori.find(x => x.id == this.state.profId);

            let trenutnaTema = this.state.teme.find(x => x.id == this.state.temaId);

            this.setState({
                otvori: true,
                selProf: trenutniProf.ime + " " + trenutniProf.prezime,
                selTema: trenutnaTema.naziv
            });
        }
        catch (err) {
            this.setState({
                otvori: false
            });

        }

    }
    handlePost(e) {
        e.preventDefault();
        axios
            .post("http://localhost:31918/temeZavrsni/" + this.state.studentId + "/" + this.state.temaId, {
                isStudent: this.state.studentId,
                idTema: this.state.temaId
            })
            .then(res => {
                console.log("uspjesno poslan post");
            })
            .catch(res => {
                console.log("greska u postu: " + res.data);
            });

    }
    componentDidMount() {

        axios
            .get("http://localhost:31918/profesori")
            .then(res => {
                this.setState(
                    {
                        profesori: res.data.data,
                        profId: res.data.data[0].id,
                        selProf: res.data.data[0]
                    });
            })
            .catch(res => {
                console.log("Doslo je do greske! " + res.data);
            });
        //teme koje se vezu za 1 mentora
        axios
            .get("http://localhost:31918/profesori/temeZavrsni/" + this.state.profId)
            .then(res => {
                this.setState({
                    teme: res.data.data
                });
                if (this.state.teme.length == 0) {
                    this.setState({
                        temaId: null,
                        selTema: null
                    })
                }
                else {
                    this.setState({
                        temaId: res.data.data[0].id,
                        selTema: res.dara.data[0].naziv
                    })
                }
            })
            .catch(
                res => {
                    console.log("nesto ne valja");
                    console.log(res.error);
                }
            );

    }
    handleChangeProf(selectedId) {

        axios
            .get("http://localhost:31918/profesori/temeZavrsni/" + selectedId)
            .then(res => {
                this.setState({
                    teme: res.data.data,
                    profId: selectedId

                });
                if (this.state.teme.length == 0) {
                    this.setState({
                        temaId: null
                    })
                }
                else {
                    this.setState({
                        temaId: res.data.data[0].id
                    })
                }

            })
            .catch(
                res => {
                    console.log("nesto ne valja");
                    console.log(res.error);
                }
            );

    }
    handleClick() {
        this.validateTema(this.state.temaId);
        this.otvori();

    }
    validateTema(id) {
        if (id == null) {
            this.setState({
                selectClass: "custom-select form-control is-invalid",
                greskaVisible: "visible"
            })
        }
        else {
            this.setState({
                selectClass: "custom-select",
                greskaVisible: "hidden"
            })
        }
    }
    render() {
        let zatvoriModal = () => this.setState({ otvori: false });
        return (
            <>
                <div className="container-fluid" style={{ marginTop: "30px" }}>
                    <h2 style={{ marginBottom: "30px" }}>Završni rad</h2>
                    <div class="card align-items-center">
                        <div class="card-body" style={{ minWidth: "100%" }}>
                            <div class="row justify-content-lg-around justify-content-md-center">
                                <div class="col-lg-4 col-sm-12 col-md-6 justify-content-sm-center ">
                                    <h4 class="card-title">Prijava završnog rada</h4>
                                    <h6 class="card-subtitle mb-2 text-muted">Ovdje možete vidjeti sve profesore koje možete odabrati za svog mentora, kao i teme koje nude.</h6>
                                    <div style={{ textAlign: "left" }}>
                                        <label class="col-form-label col-form-label-lg" htmlFor="inputLarge">Mentori</label>
                                    </div>

                                    <select class="custom-select" onChange={event => { this.handleChangeProf(event.target.value) }}>
                                        {this.state.profesori.map(
                                            (prof) =>
                                                <option key={prof.id} value={prof.id}>{prof.ime} {prof.prezime}</option>

                                        )}
                                    </select>

                                    <div style={{ textAlign: "left" }}>
                                        <label class="col-form-label col-form-label-lg" htmlFor="inputLarge">Teme</label>
                                    </div>
                                    <select class={this.state.selectClass} onChange={event => { this.validateTema(event.target.value) }} >

                                        {this.state.teme.map(
                                            (teme) =>
                                                <option key={teme.id} value={teme.id}>{teme.naziv}</option>
                                        )}
                                    </select>

                                    <div class="invalid-feedback" style={{ visibility: this.state.greskaVisible }}>Morate odabrati temu!</div>

                                    <div class="d-flex align-items-end" style={{ flexDirection: "column" }}>
                                        <button type="button" class="btn btn-primary" style={{ marginTop: "20px" }} onClick={this.handleClick}>Prijavi završni</button>
                                    </div>
                                    <hr></hr>
                                    <h4 class="card-title">Status</h4>
                                    <div class="d-flex align-items-end" style={{ flexDirection: "column" }}>
                                        <PrikaziStatus />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.otvori}
                    onHide={zatvoriModal}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Prijava završnog rada
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handlePost}>
                        <Modal.Body>
                            <h4>Da li ste sigurni da želite prijaviti završni rad?</h4>
                            <div class="form-group">
                                <div class="form-group">
                                    <label class="col-form-label" htmlFor="inputDefault">Mentor: {this.state.selProf}</label>
                                    <br></br>
                                    <label class="col-form-label" htmlFor="inputDefault">Tema: {this.state.selTema}</label>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" id="spasiBtn" class="btn btn-primary">Potvrdi</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
}

export default DropDownZavrsni;
