import React, { Component } from "react";
import axios from "axios";

class ListaPredmeta extends Component {
  state = {
    predmeti: ["Predmet1", "Predmet2", "Predmet3", "Predmet4", "Predmet5"],
    trenutnoLogovaniStudentID: 1
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:31918/predmeti/trenutni/` +
        this.state.trenutnoLogovaniStudentID
      )
      .then(res => {
        if (res.data.trenutniPredmeti != undefined) {
          const predmeti = res.data.trenutniPredmeti.map(obj => obj.naziv);
          this.setState({ predmeti });
        }
        else {
          this.setState({ predmeti: [] });
        }
      });
  }

  prikazPredmeta() {
    if (this.state.predmeti.length === 0) return <p>Nema predmeta</p>;

    return (
      <div>
        {this.props.children}
        <ul>
          {this.state.predmeti.map(predmet => (
            <li
              key={predmet}
            >
              <label className="col-form-label">{predmet}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="align-self-start">{this.prikazPredmeta()}</div>
    );
  }
}

export default ListaPredmeta;
