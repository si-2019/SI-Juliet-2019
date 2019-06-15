import React, { Component } from "react";
import { Link } from "react-router-dom";
class IspitCard extends Component {
  dajBoju (el) {
    var ONEDAY = 1000 * 60 * 60 * 24;
    var danas = new Date().getTime()
    var difference_ms = Math.abs(el.rokPrijave - danas);
    var brDana = Math.round(difference_ms/ONEDAY);
    
    if(brDana > 2){
      return "#98f442"
    }
  }
  renderIspit = () =>
    this.props.ispiti
      .filter(ispit => ispit.tipIspita === this.props.tipIspita)
      .map(el => (
        <li key={el.idIspit} style={{width:"100%", marginBottom:"20px"}}>
            <div style={{width:"100%", display:"flex"}}>
              <div style={{width:"10%"}}>
                <div style={{borderRadius:"50px", width:"15px", height:"15px", backgroundColor:this.dajBoju(el)}}></div>
              </div>
              <div style={{width:"45%"}} >{el.idPredmet}</div>
              <button style={{width:"45%"}} type="button" class="btn btn-primary" >
                        Info o ispitu
              </button>
            </div>
        </li>
      ));

  render() {
    return (
      <div
        className="card"
        style={{ width: "30%", marginRight: "10px" }}
      >
        <div className="card-body">
          <h4 className="card-title">{this.props.tipIspita}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Otvorene prijave</h6>
          <ul style={{ listStyle: "none", textAlign: "left" }}>
            {this.renderIspit(this.props.tipIspita)}
          </ul>
        </div>
      </div>
    );
  }
}

export default IspitCard;
