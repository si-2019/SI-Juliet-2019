import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

import TabelaGrupa from './TabelaGrupa.js'
import { sviPredmetiAsistenta, sveGrupeProjekta } from '../../api/projekti_zadaci';
import { upisBodovaPojedinacno, upisBodovaGrupno } from '../../api/bodovanje';

class BodovanjeProjekataStudenti extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      predmeti: [], 
      selektani_predmet: null,
      selektani_projekat: null,
      grupe: [],
    };

    this.renderGrupe = this.renderGrupe.bind(this);
    this.bodovanjePojedinacno = this.bodovanjePojedinacno.bind(this);
    this.bodovanjeGrupno = this.bodovanjeGrupno.bind(this);
    this.ucitajGrupe = this.ucitajGrupe.bind(this);
  }

  componentDidMount() {
    sviPredmetiAsistenta().then(res => {
      let predmeti = res.data.predmeti;
      let selektani_predmet = null;
      if(predmeti.length > 0) selektani_predmet = predmeti[0];

      let selektani_projekat = null;
      if(selektani_predmet && selektani_predmet.projekti.length > 0) {
        selektani_projekat = selektani_predmet.projekti[0];
      }

      if(selektani_projekat) {
        sveGrupeProjekta(selektani_projekat.idProjekat).then((res) => {
          this.setState({
            predmeti: predmeti,
            selektani_predmet: selektani_predmet,
            selektani_projekat: selektani_projekat,
            grupe: res.data.grupe
          });
        });
      }
      else {
        this.setState({
          predmeti: predmeti,
          selektani_predmet: selektani_predmet,
          selektani_projekat: selektani_projekat,
          grupe: []
        });
      }
    });
  }

  ucitajGrupe() {
    if(this.state.selektani_projekat) {
      sveGrupeProjekta(this.state.selektani_projekat.idProjekat).then((res) => {
        this.setState({
          grupe: res.data.grupe
        });
      });
    }
    else {
      this.setState({
        grupe: []
      });
    }
  }

  validacijaBodova(bodovi) {
    let maxBodova = this.state.selektani_projekat.moguciBodovi;
    if(isNaN(bodovi)) {
      // prikaz errora - neispravan unos
      console.log("Broj bodova mora biti cijeli broj");
      return false;
    }
    else if(bodovi > maxBodova || bodovi < 0) {
      // prikaz errora - bodovi moraju biti u range [0, max]
      console.log("Bodovi nisu u range [0, max]");
      return false;
    }
    return true;
  }

  bodovanjePojedinacno(studenti) {
    // validacija
    for(let i = 0; i < studenti.length; i++) {
      let trenutniBodovi = studenti[i].ostvareniBodovi;
      if(!this.validacijaBodova(trenutniBodovi)) {
        return;
      }
    }

    upisBodovaPojedinacno(studenti, this.state.selektani_projekat.idProjekat).then((response) => {
      if(response.data.message == "Uspjesno bodovan svaki clan grupe za definisani projekat.") {
        this.ucitajGrupe();
      }
      else {
        // prikaz errora - doslo je do greske
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      // doslo je do greske - nema konekcije ?
    });
  }

  bodovanjeGrupno(idGrupaProjekta, bodovi) {
    // validacija
    if(!this.validacijaBodova(bodovi)) {
      return;
    }

    upisBodovaGrupno(idGrupaProjekta, bodovi).then((response) => {
      if(response.data.message == "Uspjesno bodovan projekat.") {
        this.ucitajGrupe();
      }
      else {
        // prikaz errora - doslo je do greske
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      // doslo je do greske - nema konekcije ?
    });
  }

  selektanPredmet(val) {
    for(let i=0; i<this.state.predmeti.length; i++)
    {
      if(this.state.predmeti[i].id == val)
      {
        let selektani_projekat = null;
        if(this.state.predmeti[i].projekti.length > 0) {
          selektani_projekat = this.state.predmeti[i].projekti[0];
        }

        if(selektani_projekat) {
          sveGrupeProjekta(selektani_projekat.idProjekat).then((res) => {
            this.setState({
              selektani_predmet: this.state.predmeti[i],
              selektani_projekat: selektani_projekat,
              grupe: res.data.grupe
            });
          });
        }
        else {
          this.setState({
            selektani_predmet: this.state.predmeti[i],
            selektani_projekat: selektani_projekat,
            grupe: []
          });
        }
        return;
      }
    }    
  }

  selektanProjekat(val) {
    for(let i=0; i<this.state.selektani_predmet.projekti.length; i++)
    {
      if(this.state.selektani_predmet.projekti[i].idProjekat == val)
      {
        sveGrupeProjekta(val).then((res) => {
          this.setState({
            selektani_projekat: this.state.selektani_predmet.projekti[i],
            grupe: res.data.grupe
          });
        });
        return;
      }
    }
  }

  renderGrupe() {
    let i = 1;
    return (
      <Fragment>
      {this.state.grupe.map((grupa) => {
        return (
          <TabelaGrupa key={grupa.id} grupa={grupa} brojGrupe={i++} callbackPojedinacno={this.bodovanjePojedinacno} callbackGrupno={this.bodovanjeGrupno}></TabelaGrupa>
        );
      })}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Form>
        <FormGroup>

          <Label >Vaši predmeti: </Label>
          <Input type="select" name="predmet" onChange={(e)=>{this.selektanPredmet(e.target.value)}}>
            {this.state.predmeti.map((predmet) => {
                return (<option key={predmet.id} value={predmet.id}>{`${predmet.naziv_predmeta}`}</option>);
              })}
          </Input>

          <hr/>

          <Label >Projekti za dati predmet: </Label>
          <Input type="select" name="projekat" onChange={(e)=>{this.selektanProjekat(e.target.value)}}>
            {this.state.selektani_predmet != null ?
            this.state.selektani_predmet.projekti.map((projekat) => {
                return (<option key={projekat.idProjekat} value={projekat.idProjekat}>{`${projekat.nazivProjekta}`}</option>);
            }) : null }
          </Input>

          <hr/>

          <Label>Projektne grupe:</Label>
          <br></br>
          {this.renderGrupe()}
          
        </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

export default BodovanjeProjekataStudenti;
