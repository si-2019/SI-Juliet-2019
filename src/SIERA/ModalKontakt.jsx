import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";
class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentID: 1,
            greska: null,
            brojac: 0,
            noviInput: {
                adresa: null,
                email: null,
                brtel: null
            }
        }
        this.handlePutEvent = this.handlePutEvent.bind(this);
    }
    handleClose = () => {
        this.props.saveState("modalShow", false);
    }
    //promjena podataka bez refreshanja
    handleChange = (e) => {
        const { name, value } = e.target;
        let state = JSON.parse(JSON.stringify(this.state.noviInput));
        state[name] = value;
        this.setState({
            noviInput: state
        });
    }

    handleExit = () => {

        const { adr, mail, telefon } = this.state.noviInput;
        let podaci = JSON.parse(JSON.stringify(this.props.podaciKontakt));
        podaci.adresa = adr ? adr : podaci.adresa;
        podaci.brtel = telefon ? telefon : podaci.brtel;
        podaci.email = mail ? mail : podaci.email;
        this.setState({
            greska: null
        }, () => {
            this.props.saveState("podaciKontakt", podaci);
        })
    }
    handlePutEvent(event) {
        event.preventDefault();
        if (this.state.noviInput.adresa == null && this.state.noviInput.email == null && this.state.noviInput.brtel == null) {
            this.setState({ greska: true });
        }
        else {
            if (this.state.noviInput.adresa) {
                axios
                    .put(
                        `http://localhost:31918/studenti/update/adresa/` +
                        this.state.studentID,
                        {
                            adresa: this.state.noviInput.adresa
                        }
                    )
                    .then(res => {
                        this.setState({ greska: false });
                    });
            }
            if (this.state.noviInput.email) {
                axios
                    .put(
                        `http://localhost:31918/studenti/update/mail/` +
                        this.state.studentID,
                        {
                            mail: this.state.noviInput.email
                        }
                    )
                    .then(res => {
                        this.setState({ greska: false });
                    });
            }
            if (this.state.noviInput.brtel) {

                axios
                    .put(
                        `http://localhost:31918/studenti/update/tel/` +
                        this.state.studentID,
                        {
                            tel: this.state.noviInput.brtel
                        }
                    )
                    .then(res => {
                        this.setState({ greska: false });
                    });

            }
        }

    }
    renderujPotvrdu() {
        if (this.state.greska == false) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Zahtjev je uspjesno poslan"
                />
            );
        } else if (this.state.greska == true) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Polje ne smije biti prazno"
                />
            );
        }
        return null;
    }
    render() {
        ++this.brojac;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.handleExit}
            >
                {this.renderujPotvrdu()}
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.naslovModala}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handlePutEvent}>
                    <Modal.Body>
                        <h4>{this.props.nazivPromjene}</h4>
                        <div class="form-group">

                            <br></br>
                            <label class="col-form-label" for="inputDefault" >Telefon</label>
                            <input type="text" class="form-control" name="brtel" onChange={this.handleChange} />

                            <label class="col-form-label" for="inputDefault" >Adresa</label>
                            <input type="text" class="form-control" name="adresa" onChange={this.handleChange} />

                            <label class="col-form-label" for="inputDefault">Email</label>
                            <input type="text" class="form-control" name="email" onChange={this.handleChange} />


                        </div>

                    </Modal.Body>
                    <Modal.Footer>

                        <button type="submit" id="spasiBtn" class="btn btn-primary">Spasi Promjene</button>
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Odustani</button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default ModalComponent;

//
/*
PROPS: modalBody, onHide (funkcija), modalTitle, nazivPromjene, noviInput (json)
*/