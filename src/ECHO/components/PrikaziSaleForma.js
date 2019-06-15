import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "./PrikaziSaleForma.css";
import { Alert } from "reactstrap";
class PrikaziSaleForma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sale: [],
      id: "",
      alertVisible: false,
      alertMessage: "",
      alertMessageStatus: "",
      alertColor: "success"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:31905/si2019/echo/sveSale")
      .then(res => res.json())
      .then(json => {
        this.setState({
          sale: json
        });
      });
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }
  toggle(x) {
    this.setState({ alertVisible: !this.state.alertVisible });
  }
  validiraj() {
    if (!this.state.id) {
      this.setState({
        alertMessage: "Trenutno ne postoje sale za izbrisati! ",
        alertMessageStatus: "Greška!",
        alertVisible: true,
        alertColor: "danger"
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    if (this.validiraj()) {
      this.postObrisi();
    }
  }

  postObrisi(event) {
    fetch("http://localhost:31905/si2019/echo/obrisiSalu", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.id
      })
    }).then(
      this.setState({
        alertMessage: "Sala uspješno izbrisana! ",
        alertMessageStatus: "Ok!",
        alertVisible: true,
        alertColor: "success"
      })
    );
  }

  render() {
    return (
      <div id="omotacECHO">
        <div class="card" id="mojaKartica">
          <Alert
            id="alertID"
            color={this.state.alertColor}
            toggle={this.toggle.bind(this)}
            isOpen={this.state.alertVisible}
          >
            <strong> {this.state.alertMessageStatus}</strong> <br />
            {this.state.alertMessage}
          </Alert>
          <div class="card-body" id="mojaKarticaBody">
            <h4 class="card-title">Prikaz sala</h4>
            <select
              className="custom-select"
              id="naslovSelectAjla"
              onChange={this.handleChange}
            >
              {this.state.sale.map(item => (
                <option value={item.id}>{item.naziv}</option>
              ))}
            </select>
            <button
              id="dugme1"
              type="button"
              className="btn btn-danger"
              onClick={this.handleSubmit}
            >
              Obriši salu
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PrikaziSaleForma;
