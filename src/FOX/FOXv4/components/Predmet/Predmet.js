import React, { Component, Fragment } from 'react';
import './Predmet.css';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { dajPredmeteSaGrupama } from '../../mock/mock';

class Predmet extends Component {
     state = {
          predmeti: []
     }
     async componentDidMount(){
          const predmeti = await dajPredmeteSaGrupama()
          this.setState({
               predmeti
          })
     }
     render() { 
        return (
            <div>
               <CardColumns>
                         {
                              this.state.predmeti.map(predmet => (
                                   <Card key={predmet.id} style={{ width: '15rem', border: '0.5px solid gray' }}>
                                   <Card.Body>
                                        <Card.Title>
                                             <a href={`fox/predmeti/${predmet.id}`}> <h3>{predmet.name}</h3> </a>
                                        </Card.Title>
                                        <Card.Text>
                                             <ul>
                                                  {
                                                       predmet.grupe.map(grupa => (
                                                            <a key={grupa.id} href={`fox/predmeti/${predmet.id}?grupaId=${grupa.id}`}><li>{grupa.name}</li></a>
                                                       ))
                                                  }                   
                                             </ul>
                                        </Card.Text>              
                                     
                                        </Card.Body>
                                   </Card>
                              ))
                         }
                  </CardColumns>
            </div>
        );
    }
}
 
export default Predmet;