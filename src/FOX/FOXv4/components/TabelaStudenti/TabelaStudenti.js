import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class TabelaStudenti extends Component {
    render() {
        const { studenti } = this.props
      return (
        <div>
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>#</th>
            <th>Index</th>
            <th>Ime i Prezime</th>
            <th>Prisustvo</th>
            <th>Zadaće</th>
            <th>I parcijalni ispit</th>
            <th>II parcijalni ispit</th>
            <th>Usmeni ispit</th>
            <th>Ukupno</th>
            <th>Ocjena</th>
            </tr>
        </thead>
        <tbody>
            {
                studenti.map(s => (
                    <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.index}</td>
                    <td>{s.name}</td>
                    <td>{s.prisustvo}</td>
                    <td>{s.zadace}</td>
                    <td>{s.prviParcijalniBodovi}</td>
                    <td>{s.drugiParcijalniBodovi}</td>
                    <td>{s.usmeni}</td>
                    <td>{s.ukupno}</td>
                    <td>{s.ocjena}</td>
                    </tr>        
                ))
            }
        </tbody>
    </Table>
    </div>
/* <div class ="container">
<div className="TabelaStudenti">
    <table class="table">
        <thead>
            <tr>
            <th>#</th>
            <th>Index</th>
            <th>Ime i Prezime</th>
            <th>Prisustvo</th>
            <th>Zadaće</th>
            <th>I parcijalni ispit</th>
            <th>II parcijalni ispit</th>
            <th>Usmeni ispit</th>
            <th>Ukupno</th>
            <th>Ocjena</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>12345</td>
            <td>Ime Prezime</td>
            <td>10</td>
            <td>10</td>
            <td>15</td>
            <td>15</td>
            <td>20</td>
            <td>70</td>
            <td>7</td>
            </tr>
        </tbody>
    </table>
  </div>
</div> */
        
      );
    }
  }
  
  export default TabelaStudenti;