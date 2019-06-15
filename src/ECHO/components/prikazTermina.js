import React, { Component } from "react";
import "./prikazTermina.css";

class PrikazTermina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termini: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:31905/si2019/echo/getZeljeniTerminByKorisnikId")
      .then(res => res.json())
      .then(json => {
        this.setState({
          termini: json
        });
      });
  }

  render() {
    return (
      <div id="prikazTerminaRow">
        <div className="card mojaKartica" style={{ width: "30%" }}>
          <div className="card-body">
            <h4 className="card-title">Ponedjeljak</h4>
            <h6 className="card-subtitle mb-2 text-muted">Odabrani termini</h6>
            {this.state.termini.map(item =>
              item.danUSedmici == "Pon" ? (
                <p>
                  {item.vrijeme} -{" "}
                  {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                  :00
                </p>
              ) : (
                void 0
              )
            )}
          </div>
        </div>

        <div className="card mojaKartica" style={{ width: "30%" }}>
          <div className="card-body">
            <h4 className="card-title">Utorak</h4>
            <h6 className="card-subtitle mb-2 text-muted">Odabrani termini</h6>
            {this.state.termini.map(item =>
              item.danUSedmici == "Uto" ? (
                <p>
                  {item.vrijeme} -{" "}
                  {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                  :00
                </p>
              ) : (
                void 0
              )
            )}
          </div>
        </div>
        <div className="card mojaKartica" style={{ width: "30%" }}>
          <div className="card-body">
            <h4 className="card-title">Srijeda</h4>
            <h6 className="card-subtitle mb-2 text-muted">Odabrani termini</h6>
            {this.state.termini.map(item =>
              item.danUSedmici == "Sri" ? (
                <p>
                  {item.vrijeme} -{" "}
                  {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                  :00
                </p>
              ) : (
                void 0
              )
            )}
          </div>
        </div>
        <div className="card mojaKartica" style={{ width: "30%" }}>
          <div className="card-body">
            <h4 className="card-title">Četvrtak</h4>
            <h6 className="card-subtitle mb-2 text-muted">Odabrani termini</h6>
            {this.state.termini.map(item =>
              item.danUSedmici == "Cet" ? (
                <p>
                  {item.vrijeme} -{" "}
                  {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                  :00
                </p>
              ) : (
                void 0
              )
            )}
          </div>
        </div>
        <div className="card mojaKartica" style={{ width: "30%" }}>
          <div className="card-body">
            <h4 className="card-title">Petak</h4>
            <h6 className="card-subtitle mb-2 text-muted">Odabrani termini</h6>
            {this.state.termini.map(item =>
              item.danUSedmici == "Pet" ? (
                <p>
                  {item.vrijeme} -{" "}
                  {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                  :00
                </p>
              ) : (
                void 0
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default PrikazTermina;
