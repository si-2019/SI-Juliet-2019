import React, { Component } from "react";

import { BrowserRouter, Route } from "react-router-dom"
import LicniPod from "./licniPod.jsx";
import Ocjene from "./Ocjene";
import ProfilStudenta from "./ProfilStudenta";
import DropDownZavrsni from "./DropDownZavrsni.jsx";
import "./AppSiera.css";
import PrikaziStatus from "./PrikaziStatus";
import LeftMenuStudentSiera from "./LeftMenuStudentSiera";

import ListaTrenutnihPredmeta from "./listaTrenutnihPredmeta";
import Kontakt from "./kontaktPod";
import ListaOdslusanihPredmeta from "./listaOdslusanihPredmeta";
import UgovorOUcenju from "./ugovorOUcenju";
import IspitiTabela from "./ispitiTabela";
import Predmeti from "./predmeti";
import Prosjek from "./Prosjek.jsx";
import Statistika from "./statistika.jsx";
import Zadace from "./Zadace";
//vrati rutu za grupu tango!
class App extends Component {
  constructor() {
    super();
    this.state = {
      activeContentId: 0,
      menuButtonTitles: [, "Ispiti"],
      komponente: [<ListaTrenutnihPredmeta />],
      menuButtons: [{
        btnText: "Profil",
        component:
          <LicniPod />
      }, {
        btnText: "Ugovor o učenju",
        component: <UgovorOUcenju />
      }, {
        btnText: "Završni rad",
        component: <> <DropDownZavrsni /> </>
      }, {
        btnText: "Predmeti",
        component: <Predmeti />
      }, {
        btnText: "Ispiti po godinama",
        component: <IspitiTabela />
      }, 
      {
        btnText: "Zadaće po godinama",
        component: <Zadace />
      },
      {
        btnText: "Ocjene po godinama",
        component: <Ocjene />
      },
      {
        btnText: "Prosjek",
        component: <Prosjek />
      },
      {
        btnText: "Statistika",
        component: <Statistika />
      }
    
    ],
      menuComponents: [{
        naziv: "Profil",
        changeId: 0,
        component:
          <LicniPod />
      }]
    }
    this.onChangeActiveId = this.onChangeActiveId.bind(this);
  }
  componentDidMount() {
    var help = [];
    var i = 0;
    this.state.menuButtons.forEach(x => {
      help.push({
        naziv: x.btnText,
        changeId: i,
        component: x.component
      });
      i++;
    });
    this.setState({
      menuComponents: help
    });

  }
  onChangeActiveId = (id) => {
    this.setState({
      activeContentId: id,
    })
  };
  render() {

    return (
      <>
        <div className="App">

          <div className="containter-fluid">
            <div className="row" style={{ margin: "0px", padding: "0px" }}>
              <div className="col-lg-2 col-md-3 col-sm-12" style={{
                backgroundColor: "#2C3E50",
                minHeight: "100%",
                padding: "0px",
                margin: "0px"
              }}>
                <LeftMenuStudentSiera
                  triggerChangeActiveId={this.onChangeActiveId}
                  btnList={this.state.menuComponents}
                />
              </div>
              <div className="col-lg flex-grow-1 col-sm-12 col-md" style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 80px)",
                margin: "0px",
                padding: "0px"
              }}>

                {this.state.menuComponents[this.state.activeContentId].component}


              </div>
            </div>
          </div>


        </div>
      </>

    );
  }
}

export default App;
