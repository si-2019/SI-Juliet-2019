import React, {Component} from "react";
import InterfejsUredjivanjeClanovaGrupe from "./InterfejsUredjivanjeClanovaGrupe";
import Lista  from './prikazListe';
import './bootstrapflatly.css';
import './App.css'

class UnosInformacija extends Component {
    constructor(props) {
      super(props);
      this.state={
        forma:"null",
        idStudent:2,
        idProjekt:1,
        naziv:"",
        opis:""
      }
  
      this.handleChange = this.handleChange.bind(this);
     this.uredjivanjeClanova=this.uredjivanjeClanova.bind(this);
     this.lista=this.lista.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    /*handleSubmit(event) {
      alert('Uspjesan unos:  ' + this.state.value);
      event.preventDefault();

      onSubmit={this.handleSubmit}
    }*/
  
    render() {
      if(this.state.forma=="null") {
      return (
        <div className="card" style={{float: "left", width:"100%"}}>
          <div class="card-body">
      
          <h4 class="card-title" style={{textAlign:"left"}}>Unos informacija</h4>
          <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Unijeti potrebne informacije za opis projekta</h6> 
          <br/>
          <label class="col-form-label" style={{float:"left"}}>Naziv projektne grupe:</label>
          <input type="text" className="form-control inputText"  style={{textAlign:"left"}} />
          <br/>
          <label class="col-form-label" style={{float:"left"}}> Opis projekta:</label>
          <input type="text" className="form-control inputText" style={{textAlign:"left"}} />
          <br/>
          {/*<input type="submit" value="Submit" />*/}
          <button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.uredjivanjeClanova}>Dalje</button>
          
        </div>
      </div>
      );
    }
     else if (this.state.forma=="uredjivanjeClanova") return (
        <InterfejsUredjivanjeClanovaGrupe studentID={this.state.idStudent} projektID={this.state.idProjekt}/>
        
       );

       else if(this.state.forma=="lista") return(
         <Lista/>
       );

    }
    uredjivanjeClanova(){
      var naziv=document.getElementById("naziv").value;
      var opis=document.getElementById("opis").value;
      this.setState({
        forma:"uredjivanjeClanova",
        naziv:naziv,
        opis:opis}
      );
    }
    lista() {
      this.setState({forma:"lista"});
    }
  }
 

  export default UnosInformacija;