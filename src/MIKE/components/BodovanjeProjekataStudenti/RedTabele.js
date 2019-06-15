import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

class RedTabele extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      redniBroj: props.redniBroj,
      student: props.student,
      callback: props.callback
    };
  }

  updateInputValue(val) {
    this.setState({
        noviBodovi: val.target.value
    });
  }

  render() {
    let st = this.state.student;
    return (
        <tr key={this.state.student.id}>
          <th scope="row">{this.state.redniBroj}</th>
          <td>{st.ime}</td>
          <td>{st.prezime}</td>
          <td>{st.indeks}</td>
          <td>{st.brojBodova}</td>
          <td>
            <Input type="number" min="0" onChange={val => this.updateInputValue(val)}></Input>
          </td>
          <td>
            <Button onClick={() => {this.state.callback(st.id, this.state.noviBodovi)}}>
              Spasi bodove studenta
            </Button>
          </td>
        </tr>
        )
  }
}

export default RedTabele;
