import React, { Component } from 'react'
import FileUredjivanje from './FileUredjivanje'
import './golf.css'

class UredjivanjeObjave extends Component{

    state={
        onoff: ""
    }

    componentDidMount(){
        let tekst=""
        if(!this.props.objavljeno){
            tekst="on"
        }
        this.setState({
            onoff: tekst
        })
    }

    render(){
        return(

            

          <div>
          <div class="card" id="dodavanjeObjave">
              <div class="card-body">
              <form  encType="multipart/form-data" method="POST" action="http://localhost:31907/r1/updateMaterijal">
                  <div class="form-group">
                      <label class="col-form-label" for="inputDefault" >Naslov: </label>
                      <input type="text" class="form-control" name="naziv"></input>
                   </div>
                   <div class="form-group">
                      <label class="col-form-label" for="inputDefault" >Opis: </label>
                      <textarea class="form-control" name="napomena" rows="3"></textarea>
                   </div>
                   {this.props.fileovi.map(file=><FileUredjivanje id={file.id} naziv={file.naziv}/>)}
                   <div class="form-group">
                      <label for="exampleInputFile">Datoteke: </label>
                      <br></br>
                      <input type="file" name="fileovi" multiple></input>
                  </div>
                  <input type="checkbox" checked={this.state.onoff}></input> Sakrij objavu
                  <input type="hidden" name="idMaterijal"></input>
                  <button type="submit" class="btn btn-primary" id="dugmeObjavi">Izmijeni</button>
                  </form>
              </div>
          </div>
      </div>
        )
    }
}

export default UredjivanjeObjave