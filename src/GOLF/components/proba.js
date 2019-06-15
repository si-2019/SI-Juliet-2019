import React, { Component } from 'react';
import SviPredmeti from './SviPredmeti';
import PropTypes from 'prop-types';
import LiteraturaProfesor from './literaturaProfesor';
import LiteraturaStudent from './literaturaStudent';
import DodavanjeDatuma from './DodavanjeDatuma';
import ObjavaStudent from './objavaStudent';
import ObjavaProfesor from './objavaProfesor';
import DodavanjeObjave from './dodavanjeObjave';
import OPredmetuProfesor from './oPredmetuProfesor';
import OPredmetuStudent from './oPredmetuStudent';
import Sedmica from './sedmica';
import Dropdown from './dropdown';
import UredjivanjeObjave from './UredjivanjeObjave'

class proba extends Component {
  render() {
    this.state={
      svipredmeti: [
        {
          id: 1,
          naziv: 'SI',
          opis:' opis premeta hvhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj z hjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj zhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj zhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj zhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj zhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj zhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj zhjvihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhb jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj z'
        },
        {
          id: 2,
          naziv: 'VI',
          opis: 'opis predmeta'
        }
      ],
      datumobjave:{
          id:1,
          datum:Date.now()
        },

        fileovi:[
          'prvi.pdf',
          'drugi.pdf',
          'treci.pdf',
          'cetvrti.pdf',
          'peti.pdf',
          'sesti.pdf'
        ],
        fileovi2:[
          'prvi.pdf',
          'drugi.pdf'
        ]
      

    }
    return (
      
        <div>
            <h1>Moji predmeti</h1>
            
        </div>
        

    );
  }
}
SviPredmeti.propTypes={
  svipredmeti: PropTypes.array.isRequired
}
export default proba;