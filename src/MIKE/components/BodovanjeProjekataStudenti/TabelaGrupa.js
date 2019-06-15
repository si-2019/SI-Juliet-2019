import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

import RedTabele from './RedTabele.js'

class TabelaGrupa extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      brojGrupe: props.brojGrupe,
      grupa: props.grupa,
      callbackPojedinacno: props.callbackPojedinacno,
      callbackGrupno: props.callbackGrupno
    };

    this.bodovanjePojedinacno = this.bodovanjePojedinacno.bind(this);
    this.bodovanjeGrupno = this.bodovanjeGrupno.bind(this);
  }

  bodovanjePojedinacno(idStudenta, noviBodovi) {
    let studenti = [
        {
            idStudent: idStudenta,
            idGrupaProjekta: this.state.grupa.id,
            ostvareniBodovi: noviBodovi
        }
    ];

    this.state.callbackPojedinacno(studenti);
  }

  bodovanjeGrupno(noviBodovi) {
    this.state.callbackGrupno(this.state.grupa.id, noviBodovi);
  }

  updateInputValue(val) {
    this.setState({
        bodoviGrupa: val.target.value
    });
  }

  render() {
    let i = 1;
    return (
      <Fragment key={this.state.grupa.id}>
        
        <Label>{this.state.grupa.nazivGrupe}</Label>

        <Input type="number" min="0" placeholder="Bodovi za svakog člana..." onChange={val => this.updateInputValue(val)}></Input>

        <br/>

        <Button onClick={() => {this.bodovanjeGrupno(this.state.bodoviGrupa)}}>
              Unesi iste bodove za sve članove projektne grupe
        </Button>

        <hr/>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Indeks</th>
              <th>Broj bodova</th>
              <th>Novi bodovi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { 
              this.state.grupa.studenti.map((student) => {
                    return (
                      <RedTabele key={student.id} redniBroj={i++} student={student} callback={this.bodovanjePojedinacno}></RedTabele>
                    )
                  })
            }
          </tbody>
        </Table>

        <hr/>

      </Fragment>
    );
  }
    
}

export default TabelaGrupa;
