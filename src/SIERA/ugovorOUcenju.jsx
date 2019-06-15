import React, { Component } from "react";
import axios from "axios";
import "./bootstrap.min.css";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class UgovorOUcenju extends Component {
  //fali api za dobavljanje smjerova iz baze
  //fali api za obavezne predmete
  constructor() {
    super();
    this.state = {
      izabranaGodina: 1,
      izabraniSmjer: 1,
      izabraniSemestar: 1,
      listaIzbornih: [],
      listaObaveznih: [],
      hasError: false,
      studentId: 1,
      pdfUrl: null,
      ime: "Neko",
      prezime: "Neko",
      indeks: "00000",
      ciklus: 1,
      sviSmjerovi: []

    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handlePrikaz = this.handlePrikaz.bind(this);
    this.promjenaGodineStudija = this.promjenaGodineStudija.bind(this);
    this.promjenaSmjera = this.promjenaSmjera.bind(this);
    this.promjenaSemestra = this.promjenaSemestra.bind(this);
    this.prikaziIzborne = this.prikaziIzborne.bind(this);
  }
  handleCreate() {
    //kreiranje ugovora
    //popravi smjer
    console.log("odsjek: " + this.state.izabraniSmjer);
    axios
      .get("http://localhost:31918/ugovori/kreiraj/" + this.state.studentId, {
        ime: this.state.ime,
        prezime: this.state.prezime,
        semestar: this.state.izabraniSemestar,
        ciklus: this.state.ciklus,
        odsjek: this.state.izabraniSmjer,
        indeks: this.state.indeks,
        obavezni: this.state.listaObaveznih,
        izborni: this.state.listaIzbornih,
        godina: this.state.izabranaGodina
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(res => {
        console.log("greskaaa");
      });

  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  promjenaGodineStudija(event) {
    this.setState({ izabranaGodina: event.target.value }, function () {
      console.log(this.state.izabranaGodina);
      if (this.state.izabranaGodina <= 3) {
        this.setState({
          ciklus: 1
        })
      }
      else if (this.state.izabranaGodina >= 5 && this.state.izabranaGodina <= 6) {
        this.setState({
          ciklus: 2
        })
      }
      else {
        this.setState({
          ciklus: 3
        })
      }
      this.prikaziIzborne();
    });
  }

  promjenaSmjera(event) {
    this.setState({ izabraniSmjer: event.target.value }, function () {
      console.log(this.state.izabraniSmjer);
      this.prikaziIzborne();
    });
  }

  promjenaSemestra(event) {
    this.setState({ izabraniSemestar: event.target.value }, function () {
      console.log(this.state.izabraniSemestar);
      this.prikaziIzborne();
    });
  }

  prikaziIzborne() {
    try {
      axios
        .get(
          `http://localhost:31918/predmeti/` +
          this.state.izabraniSmjer +
          `/` +
          this.state.izabranaGodina +
          `/` +
          this.state.izabraniSemestar
        )
        .then(res => {

          if (res.data.dostupniPredmeti != undefined) {
            const predmeti = res.data.dostupniPredmeti.map(obj => obj.naziv);
            const obavezan = res.data.dostupniPredmeti.map(obj => obj.obavezan);
            const izborni = [];
            for (var i = 0; i < obavezan.length; i++) {
              if (obavezan[i] == "0") {
                izborni.push(predmeti[i]);
              }
            }
            this.setState({ listaIzbornih: izborni });
          }
          else {
            this.setState({ listaIzbornih: [] });
          }
        });
    } catch (e) { }
  }

  componentDidMount() {
    this.prikaziIzborne();
    //dobavljanje ugovora za prikaz
    axios
      .get("http://localhost:31918/ugovori/url/" + this.state.studentId)
      .then(res => {
        this.setState({
          pdfUrl: res.data.link
        });
      })
      .catch(res => {
        console.log(res.error);
      });

    //dobavljanje studenta
    axios
      .get("http://localhost:31918/studenti/" + this.state.studentId)
      .then(res => {
        this.setState({
          ime: res.data.ime,
          prezime: res.data.prezime,
          indeks: res.data.index
        });
      })
      .catch(res => {
        console.log(res.error);
      });
    //dobavljanje smjerova
    axios
      .get("http://localhost:31918/odsjek")
      .then(res => {
        this.setState({
          sviSmjerovi: res.data.odsjeci
        })
      })
      .catch(res => {
        console.log(res);
      });
  }
  handlePrikaz() {
    //prikaz u prozoru
    const win = window.open("", "_self");
    let html = '';

    html += '<html>';
    html += '<body style="margin:0!important">';
    html += '<embed width="100%" height="100%" src="' + this.state.pdfUrl + '" type="application/pdf" />';
    html += '</body>';
    html += '</html>';

    setTimeout(() => {
      win.document.write(html);
    }, 0);
  }

  render() {
    return (
      <div>
        <div className="container-fluid" style={{ marginTop: "30px" }} >
          <h2 style={{ marginBottom: "30px" }}>Ugovor o učenju</h2>
          <div className="card align-items-center">
            <div className="card-body" style={{ minWidth: "100%" }}>
              <div className="row justify-content-lg-around justify-content-md-center">
                <div className="col-lg-4 col-sm-12 col-md-6 justify-content-sm-center ">
                  <h4 className="card-title">Kreiranje ugovora</h4>
                  <h6 className="card-subtitle mb-2 text-muted">Ovdje možete kreirati ugovor o učenju za upis u naredni semestar.</h6>
                  <div style={{ textAlign: "left" }}>
                    <label className="col-form-label col-form-label-lg">
                      Godina studija
                  </label>
                  </div>

                  <select
                    className="custom-select"
                    onChange={e => this.promjenaGodineStudija(e)}
                  >
                    <option value="1">1.</option>
                    <option value="2">2.</option>
                    <option value="3">3.</option>
                    <option value="4">4.</option>
                    <option value="5">5.</option>
                    <option value="6">6.</option>
                    <option value="7">7.</option>
                    <option value="8">8.</option>
                  </select>

                  <div style={{ textAlign: "left" }}>
                    <label className="col-form-label col-form-label-lg">
                      Smjer
                  </label>
                  </div>
                  <select
                    className="custom-select"
                    onChange={e => this.promjenaSmjera(e)}
                  >
                    {this.state.sviSmjerovi.map(x =>
                      <option value={x.idOdsjek}>{x.naziv}</option>
                    )}
                  </select>

                  <div style={{ textAlign: "left" }}>
                    <label className="col-form-label col-form-label-lg">
                      Semestar
                  </label>
                  </div>
                  <select
                    className="custom-select"
                    name="semestri"
                    onChange={e => this.promjenaSemestra(e)}
                  >
                    <option value="1">1.</option>
                    <option value="2">2.</option>
                  </select>

                  <div className="form-group">
                    <div style={{ textAlign: "left" }}>
                      <label className="col-form-label col-form-label-lg">
                        Izborni predmeti
                    </label>
                    </div>

                    {this.state.listaIzbornih.length === 0 ? (
                      <p>Nema izbornih predmeta</p>
                    ) : (
                        ""
                      )}
                    {this.state.listaIzbornih.map((item, i) => (
                      <div className="custom-control custom-checkbox" key={i}>
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={"customCheck" + i}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={"customCheck" + i}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Kreiraj ugovor</button>
                    
                    <button type="button" className="btn btn-primary" onClick={this.handlePrikaz} style={{marginLeft:"10px"}}>Prikaži ugovor</button>
                  </div>

                </div>
              </div>
            </div>
            <div className="col" />
          </div>
        </div>
      </div>

    );
  }
}

export default UgovorOUcenju;
