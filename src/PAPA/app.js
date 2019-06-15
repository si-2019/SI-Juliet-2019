import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Predmet from './komponente/Predmet.js'
import Obavijestenja from './komponente/Obavjestenja';
import Calendar from './komponente/Calendar';
import PredmetE from '../GOLF/app';
import ProsjekPoGodinama from '../LIMA/Izvjestaji/components/Dijagrami/ProsjekPoGodinama.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        pozvanafija: false
    }
    this.fija=this.fija.bind(this)
    
}

  fija=()=>{
    this.setState({
      pozvanafija:true
    });
  }

  render() {
    var ispis=(
      <Container style={{backgroundColor: "#fff"}}>
        <Row>
          <Col>
            <Predmet fija={this.fija}/>
          </Col>
          <Col>
            <Obavijestenja fija={this.fija}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Calendar /> 
          </Col>
        </Row>
        <Row>
          <Col><ProsjekPoGodinama /></Col>
          <Col>Graf</Col>
          <Col>Graf</Col>
        </Row>
      </Container>
    )
    return (
       <div>
         {this.state.pozvanafija ? <PredmetE /> : ispis}
       </div>
    );
  }
}

export default App;