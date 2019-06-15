import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import 'filepond/dist/filepond.min.css';
import './komponenta.css';

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      projekat: props.projekat,
      fajlovi : []
    };
  }

  render() {
    let detalji = <div id="detalji"></div>
    if(this.state.fajlovi.length > 0)
      detalji = (<div id="detalji">
        <h3>Fajlovi za upload: </h3>
      { this.state.fajlovi != null ? this.state.fajlovi.map((fajl) => { return (<h4>{fajl.name}</h4>)}) : null }
      </div>);

    return (
        <div className="header">
            <h3>Odaberite projektne fajlove za upload: </h3>
            <div className="upload">
              <Form method="post" action="http://localhost:31913/api/work/addfile" enctype="multipart/Form-data">
                <FormGroup>

                  <Input name="idProjektnogZadatka" type="select">
                    {this.state.projekat.zadaci.map((zadatak) => {
                      return (<option key={zadatak.idProjektnogZadatka} value={zadatak.idProjektnogZadatka}>{`${zadatak.opis} (${zadatak.otkad}-${zadatak.dokad})`}</option>);
                    })}
                  </Input>

                  <br/><br/>

                  <Input id="filesToUpload" name="fajlovi" type="file" onChange={this.handleChange.bind(this)} required multiple />
                  
                  <br/><br/>

                  <Input type="submit" value="Upload files" />

                </FormGroup>
              </Form>
            </div>
            <br/><br/>
            {detalji}
        </div>
    );
  }

  handleChange(event) {
    this.setState({ fajlovi : [...event.target.files] })
    console.log(event.target.files);
  }
}

export default UploadFiles;