import React, { Component } from "react";
import axios from "axios";

class TabelaSortiranaPoOcjeni extends Component {
  state = {
    sortiraniPredmetiPoOcjeni: [],
    ocjene: [],
    trenutnoLogovaniStudentID: 100
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:31918/ocjene/` +
        this.state.trenutnoLogovaniStudentID + "/sort"
      )
      .then(res => {
        if (res.data.ocjene != undefined) {
          const sortiraniPredmeti = res.data.ocjene.map(obj => obj.naziv);
          const ocjene = res.data.ocjene.map(obj => obj.ocjena);
          this.setState({ sortiraniPredmetiPoOcjeni: sortiraniPredmeti, ocjene: ocjene });
        }
      });
  }


  render() {
    return (
      <div className="col-sm-12 col-xs-12 col-md-12 col-lg-4">
        {this.state.sortiraniPredmetiPoOcjeni.length == 0 ? <span style={{ float: "left", marginLeft: "30px" }}>Student trenutno nema ocjena</span> :
          <table className="table table-bordered text-center bg-active border-solid" style={{ float: "left", marginLeft: "20px" }}>
            <tbody>
              <tr class="bg-primary text-light">
                <th class="tabtip">Predmet</th>
                <th class="tabtip">Ocjena</th>
              </tr>
              {this.state.sortiraniPredmetiPoOcjeni.map((item, i) => (
                <tr className="tabtip1" key={i}>
                  <td>{item}</td>
                  <td>{this.state.ocjene[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default TabelaSortiranaPoOcjeni;