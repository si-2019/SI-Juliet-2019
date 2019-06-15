import React, { Component } from 'react';
import axios from 'axios';
import ModalComponent from "./ModalKontakt";

class KontaktPod extends Component {
    state = {
        StudentID: 1,
        adresa: "lala",
        email: "isajdi",
        brtel: "98426",
        modalShow: false,

    }
    saveState = (type, state) => {
        switch (type) {
            case "modalShow":
                this.setState({
                    modalShow: state
                });
                break;
            case "podaciKontakt":
                this.setState(state, () => {
                    this.setState({
                        modalShow: false
                    });
                });
                break;
            default:
                break;

        }
    }
    componentDidMount() {
        axios
            .get(
                `http://localhost:31918/studenti/` +
                this.state.StudentID
            )
            .then(res => {

                const br = res.data.map(obj => obj.telefon);
                this.setState({ brtel: br });
                const eml = res.data.map(obj => obj.email);
                this.setState({ email: eml });
                const adr = res.data.map(obj => obj.adresa);
                this.setState({ adresa: adr });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <>
                <h4 className="card-title">Kontakt podaci</h4>
                <div className="form-group">
                    <label class="col-form-label" for="inputDefault">Telefon</label>
                    <br></br>
                    <h4>{this.state.brtel}</h4>
                </div>
                <div className="form-group">
                    <label class="col-form-label" for="inputDefault">Adresa</label>
                    <br></br>
                    <h4>{this.state.adresa}</h4>
                </div>
                <div className="form-group">
                    <label class="col-form-label" for="inputDefault">Email</label>
                    <br></br>
                    <h4>{this.state.email}</h4>
                </div>

                <button type="button" class="btn btn-link" id="editBtn" onClick={() => this.setState({ modalShow: true })} >Edit</button>

                <ModalComponent
                    saveState={this.saveState}
                    show={this.state.modalShow}
                    naslovModala="Kontakt podaci"
                    podaciKontakt={this.state}
                />
            </>
        );
    }
}

export default KontaktPod;
