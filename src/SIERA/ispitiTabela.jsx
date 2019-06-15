import React, { Component } from "react";
import "./bootstrap.min.css";
import axios from "axios";
import { FormGroup, Table } from "reactstrap";
import "./tabela.css"

class IspitiTabela extends Component {
  state = {
    listaIspita: [
      [
        {
          idGodine: 11,
          nazivGodine: "2018/19",
          predmeti: [
            {
              idPredmet: 4,
              nazivPredmeta: "Projektovanje informacionih sistema",
              ispiti: []
            },
            { idPredmet: 5, nazivPredmeta: "DS", ispiti: [] },
            { idPredmet: 6, nazivPredmeta: "IEK", ispiti: [] },
            { idPredmet: 7, nazivPredmeta: "VI", ispiti: [] },
            {
              idPredmet: 8,
              nazivPredmeta: "ARM",
              ispiti: [
                {
                  idIspita: 1,
                  nazivIspita: "Prvi parcijalni",
                  bodovi: 10,
                  datum: "2019-05-01T09:00:00.000Z"
                },
                {
                  idIspita: 4,
                  nazivIspita: "Drugi parcijalni",
                  bodovi: 12,
                  datum: "2019-05-31T10:00:00.000Z"
                }
              ]
            },
            {
              idPredmet: 9,
              nazivPredmeta: "SI",
              ispiti: [
                {
                  idIspita: 2,
                  nazivIspita: "Prvi parcijalni",
                  bodovi: 18,
                  datum: "2019-05-05T10:00:00.000Z"
                }
              ]
            }
          ]
        }
      ],
      [
        {
          idGodine: 12,
          nazivGodine: "2017/18",
          predmeti: [{ idPredmet: 12, nazivPredmeta: "RA", ispiti: [] }]
        }
      ]
    ],
    trenutnoLogovaniStudentID: 1
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:31918/ispiti/` + this.state.trenutnoLogovaniStudentID
      )
      .then(res => {
        if (res.data.akademskeGodine != undefined) {
          const lista = res.data.akademskeGodine;
          this.setState({ listaIspita: lista });
        }
        else{
          this.setState({ listaIspita: [] });
        }
      });
  }

  srediDatum(datum) {
    var n = datum.indexOf("T");
    if (n != -1) {
      datum = datum.substring(0, n != -1 ? n : datum.length);
    }
    return datum;
  }

  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}>Ispiti</h2>
        <div className="row justify-content-center" style={{ padding: "20px" }}>
          {this.state.listaIspita.map((item, i) => (
            <div className="col-sm-12 col-xs-12 col-md-12 col-lg-10 ">
              <table className="table table-bordered text-center bg-active border-solid" key={i}>
                <tbody>
                  <tr className="bg-primary text-light" key={item[0].idGodine}>
                    <th className="tabtip" scope="row" colSpan="7" style={{ textAlign: "center" }}>
                      Akademska godina: {item[0].nazivGodine}
                    </th>
                  </tr>
                  {item[0].predmeti.map(itemPredmet => [
                    <tr className="bg-primary text-light"
                      key={
                        itemPredmet.idPredmet + item[0].nazivGodine + "naziviIspita"
                      }
                    >
                      {itemPredmet.ispiti.length == 0 ? null : <th className="tabtip1" />}
                      {itemPredmet.ispiti.map(itemIspiti => (
                        <th className="tabtip1"
                          colSpan="2"
                          style={{ textAlign: "center" }}
                          key={itemIspiti.idIspita}
                        >
                          {itemIspiti.nazivIspita}
                        </th>
                      ))}
                    </tr>,
                    <tr className="bg-primary text-light"
                      key={
                        itemPredmet.idPredmet +
                        item[0].nazivGodine +
                        "predmethatumBodovi"
                      }
                    >
                      {itemPredmet.ispiti.length == 0 ? null : (
                        <th className="tabtip" scope="row">Predmet</th>
                      )}
                      {itemPredmet.ispiti.map(itemIspiti => [
                        <th className="tabtip"
                          style={{ textAlign: "center" }}
                          key={itemIspiti.idIspita + "datum"}
                        >
                          Datum
                      </th>,
                        <th className="tabtip"
                          style={{ textAlign: "center" }}
                          key={itemIspiti.idIspita + "bodovi"}
                        >
                          Ostvareni bodovi
                      </th>
                      ])}
                    </tr>,
                    <tr

                      key={
                        itemPredmet.idPredmet + item[0].nazivGodine + "datumBodovi"
                      }
                    >
                      {itemPredmet.ispiti.length == 0 ? null : (
                        <th className="tabtip1"
                          style={{ textAlign: "center" }}>
                          {itemPredmet.nazivPredmeta}
                        </th>
                      )}
                      {itemPredmet.ispiti.map(itemIspiti => [
                        <th className="tabtip1"
                          style={{ textAlign: "center" }}
                          key={itemIspiti.idIspita + itemIspiti.datum}
                        >
                          {this.srediDatum(itemIspiti.datum)}
                        </th>,
                        <th className="tabtip1"
                          style={{ textAlign: "center" }}
                          key={
                            itemIspiti.idIspita +
                            itemIspiti.datum +
                            itemIspiti.bodovi
                          }
                        >
                          {itemIspiti.bodovi}
                        </th>
                      ])}
                    </tr>
                  ])}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default IspitiTabela;
