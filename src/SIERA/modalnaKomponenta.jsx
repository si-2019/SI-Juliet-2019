import React, { Component } from "react";
import "./bootstrap.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";

class modalnaKomponenta extends Component {
  state = {
    vrijednostInputa: "",
    greska: null,
    trenutnoLogovaniStudentID: 1
  };

  constructor(props) {
    super(props);
    this.promjenaInputa = this.promjenaInputa.bind(this);
    this.brojac = 0;
  }

  posaljiZahtjev() {
    if (this.state.vrijednostInputa == "") {
      this.setState({ greska: true });
    } else {
      if (this.props.nazivpromjene == "LinkedIn") {
        axios
          .put(
            `http://localhost:31918/studenti/update/linkedin/` +
              this.state.trenutnoLogovaniStudentID,
            { linkedin: this.state.vrijednostInputa }
          )
          .then(res => {
            this.setState({ greska: false });
            window.location.reload();
            //console.log(res);
            //console.log(res.data);
          });
      } else if (this.props.nazivpromjene == "Website") {
        axios
          .put(
            `http://localhost:31918/studenti/update/website/` +
              this.state.trenutnoLogovaniStudentID,
            { website: this.state.vrijednostInputa }
          )
          .then(res => {
            this.setState({ greska: false });
            window.location.reload();
            //console.log(res);
            //console.log(res.data);
          });
      }
    }
  }

  promjenaInputa(event) {
    this.setState({ vrijednostInputa: event.target.value });
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
    return "";
  }

  render() {
    ++this.brojac;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.renderujPotvrdu()}
        <Modal.Header closeButton class="modal-header">
          <Modal.Title id="contained-modal-title-vcenter" class="modal-title">
            Unesite novu vrijednost polja
          </Modal.Title>
        </Modal.Header>
        <Modal.Body class="modal-body">
          <label class="col-form-label">{this.props.nazivpromjene}:</label>
          <input
            type="text"
            class="form-control"
            placeholder={this.props.nazivpromjene}
            id="inputDefault"
            onChange={this.promjenaInputa}
          />
        </Modal.Body>
        <Modal.Footer>
          <button class="btn btn-primary" onClick={() => this.posaljiZahtjev()}>
            Pošalji zahtjev
          </button>
          <button class="btn btn-secondary" onClick={this.props.onHide}>
            Zatvori
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default modalnaKomponenta;
