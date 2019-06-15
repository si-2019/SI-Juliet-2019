import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";

class PrikaziStatus extends Component {
  constructor() {
    super();
    this.state = {
      StudentID: 1,
      status: [],
      teme: [],
      od: "Odobreno",
      neod: "Neodobreno",
      ncek: "Na čekanju",
      show: false
    }
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:31918/temezavrsni/` +
        this.state.StudentID
      )
      .then(res => {

        const Teme = res.data.teme.map(obj => obj.naziv);
        this.setState({ teme: Teme });

        const Status = res.data.teme.map(obj => obj.odobreno);
        this.setState({ status: Status });

      });
  }

  Provjeri = provjeri => {
    if (provjeri == null) return <p>Na čekanju</p>
    else if (provjeri == 1) return <p>Odobreno</p>
    return <p>Neodobreno</p>
  }

  handleOdobreno() {

    return (
      <div className="row">
        {this.props.children}
        <div className="col-sm"> Tema:
            <ul>
            {this.state.teme.map(tema => (
              <li className="list-group-item list-group-item-action mt-2" key={tema}>
                {tema}
              </li>
            ))}

          </ul>
        </div>
        <div className="col-sm">Status:
            <ul>
            {this.state.status.map(odobreno => (
              <li className="list-group-item list-group-item-action mt-2" key={odobreno}>
                {this.Provjeri(odobreno)}
              </li>
            ))}

          </ul>
        </div>
      </div>
    );
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {

    return (
      <>
        <button type="submit" class="btn btn-primary" onClick={this.handleShow}>Prikaži status</button>
        <Modal show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Završni rad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {this.handleOdobreno()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" onClick={this.handleClose} class="btn btn-secondary">Zatvori</button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default PrikaziStatus;