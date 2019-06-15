import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import MojiPredmeti from './components/mojiPredmeti.js'
import Ciklusi from './components/ciklusi.js'
import proba from './components/proba.js'
import SemestarPredmeti from './components/semestarPredmeti.js'
import StranicaPredmeta from './components/stranicaPredmeta.js'
import './components/golf.css'


class App extends Component {

  render() {
    
    return (
      <div>
        <div style={{
          height: "calc(100vh - 80px)"
        }}>
        <Router>
                <div class='row' id='glavni' style={{
                      height: "100%"
                    }}>
                    <div class='col-3' id="meni" style={{
                      backgroundColor: "#2C3E50",
                      height: "100%",
                      padding: "0px",
                       margin: "0px"
                    }}>
                      <Link to='/Golf/mojiPredmeti/1' class="dugmeLink">
                          <button type="button" class="btn btn-primary left-buttons" id="mpl">Moji predmeti</button>
                      </Link>
                     <Ciklusi />
                     
                    </div>
                    <div class='col-9'>
                        <Route exact path="/Golf" component={proba} />
                        <Route path="/Golf/mojiPredmeti/:idKorisnika" component={MojiPredmeti}/>
                        <Route path="/Golf/semestarPredmeti/:ciklus/:odsjek/:semestar" component={SemestarPredmeti}/>  
                        <Route path="/Golf/stranicaPredmeta/:nazivAG/:idPredmeta/:idKorisnika" component={StranicaPredmeta}/>    
				              </div>
                </div>
            </Router>
        </div>
      </div>
    );
  }
}

export default App;
