import React, { Component } from "react";
import FormCharlie from "../SharedComponents/FormCharlie";
import { Link } from 'react-router-dom';
import DatePicker from "react-datetime";

class KreirajIspitDetalji extends Component {
  state = { napomenaGreska: false };

  render() {
    return (
      <div class="container-fluid" style={{marginTop: "30px"}}>
      <h2 style={{marginBottom: "30px"}}>Kreiraj ispit detalji</h2>

      <div class="card align-items-center">
        <div class="card-body" style={{minWidth: "100%"}}>
        <div class="row justify-content-lg-around justify-content-md-center">
        <div class="col-lg-4 col-sm-12 col-md-6 justify-content-sm-center ">
          <h4 class="card-title">Kreiranje ispita</h4>
          <h6 class="card-subtitle mb-2 text-muted">Ovdje je potrebno unijeti sve informacije kako biste mogli kreirati termin ispita.</h6>
            <div style={{textAlign: "left"}}>  
              <label htmlFor="rokPrijave" class="col-form-label col-form-label-lg">Rok prijave: </label> 
            </div>
              <DatePicker
                        id="rokPrijave"
                        
                
              />  
              <div style={{textAlign: "left"}}>                
              <label class="col-form-label col-form-label-lg" htmlFor="vrijemeTrajanja">Vrijeme trajanja: </label> </div>
              <input type="number" className="form-control" id="vrijemeT" />
              <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="Kapacitet">Kapacitet: </label> </div>
              <input type="number" className="form-control" id="kapacitet" />
              <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="Kapacitet">Napomena: </label> </div>
              
           <textarea
                    
                    className="form-control"
                    id="ispitnaNapomena"
                    placeholder="Ovdje unesite napomenu..."
                    rows="15"
                   
        />
           
           <div style={{float: "right"}}>
            
              <button type="button" class="btn btn-primary" id="btnSpasi" style={{marginTop:"20px", marginRight: "10px"}}>Kreiraj ispit</button>
           
              <button type="button" class="btn btn-secondary" id="btnPovratak" style={{marginTop: "20px"}}>Odustani</button>
            
           </div>

          </div>
        </div>
        </div>
        </div>
        </div>
    );
  }
}

export default KreirajIspitDetalji;
