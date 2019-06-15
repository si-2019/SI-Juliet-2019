import React, { Component } from 'react';
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import Pocetna from '../Pocetna/Pocetna';
import StranicaPredmeta from '../StranicaPredmeta/StranicaPredmeta';
import Student from '../Stranice/Student';
import UnosPodataka from '../Stranice/UnosPodataka';
import Ispiti from '../Stranice/Ispiti';
import Obavijesti from '../Stranice/Obavijesti';
import Zadace from '../Stranice/Zadace';
import Ankete from '../Stranice/Ankete';
import Statistika from '../Stranice/Statistika';
import Raspored from '../Stranice/Raspored';
import Chat from '../Stranice/Chat';
import Forum from '../Stranice/Forum';
import Materijali from '../Stranice/Materijali';

class App extends Component {
    render() {
      return (
        <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/fox/predmeti/:predmetId" component={StranicaPredmeta} />
            <Route path="/fox/student" component={Student} /> 
            <Route path="/fox/unos_podataka" component={UnosPodataka} /> 
            <Route path="/fox/ispiti" component={Ispiti} /> 
            <Route path="/fox/obavijesti" component={Obavijesti} /> 
            <Route path="/fox/zadace" component={Zadace} /> 
            <Route path="/fox/ankete" component={Ankete} /> 
            <Route path="/fox/statistika" component={Statistika} /> 
            <Route path="/fox/raspored" component={Raspored} /> 
            <Route path="/fox/chat" component={Chat} /> 
            <Route path="/fox/forum" component={Forum} /> 
            <Route path="/fox/materijali" component={Materijali} />         
            <Route path="/fox" component={Pocetna}/>
          </Switch>
        </div>
       </BrowserRouter>
      );
    }
  }
  
  export default App;