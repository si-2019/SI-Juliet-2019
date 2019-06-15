import React, { Component } from "react";
import Materijali from "./Materijali";
import Ankete from "./Ankete";
import Izvjestaji from "./Izvjestaji";
import Forum from "./Forum";
import Raspored from "./Raspored";

class DrugiModuli extends Component {
  render() {
    return (
      <div className="row" >
        <div className='col-2'>
          <Materijali />
        </div>
        <div className='col-2'>
          <Ankete />
        </div>
        <div className='col-2'>
          <Izvjestaji />
                  </div>  
        <div className='col-2'>
          <Forum />
        </div>
        <div className='col-2'>
          <Raspored />
        </div>
          
      </div>
    );
  }
}

export default DrugiModuli;
