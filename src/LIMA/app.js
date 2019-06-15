import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import PotvrdeRouter from './Potvrde/PotvrdeRouter.js';
import IzvjestajiRouter from './Izvjestaji/IzvjestajiRouter.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

function App() {
  return (
    <div id="main">
      <ToastContainer />
      {Paths()}
      <div id="rightBeta" className="p-2">
        <Route path="/Lima/potvrde" component={PotvrdeRouter}/>
        <Route path="/Lima/izvjestaji" component={IzvjestajiRouter} />
      </div>
    </div>
  );
}

function Paths() {
  return (
    <div id="leftBeta">
      <div>
        <Link to="/Lima/izvjestaji"><button className="btn btn-primary left-buttons">Izvjestaji</button></Link>
        <Link to="/Lima/potvrde"><button className="btn btn-primary left-buttons">Potvrde</button></Link>
      </div>
    </div>
  );
}

export default App;