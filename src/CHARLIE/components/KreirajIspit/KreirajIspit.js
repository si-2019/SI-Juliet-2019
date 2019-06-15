import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class KreirajIspit extends Component{

  state = {response:[], brojStudenata:0, validationError: false, validationErrorMessage: ""}


  async componentDidMount(){
    const {data} = await axios.get('http://si2019charlie.herokuapp.com/api/predmeti')
    //const {data1} = await axios.get('http://si2019charlie.herokuapp.com/api/brojStudenata') - kad se napravi na BE
    const data1=15 // hardkodirana vrijednost
    this.setState({response:data})
    this.setState({brojStudenata:data1})
  }

  renderOptions = () => {
    if(!this.state.response) return
    return this.state.response.map(element => 
      <option>{element.naziv}</option>
    );
  }

  brojStudenata = () => {
    if(!this.state.brojStudenata) return
    return this.state.brojStudenata
  }


  validate = (e) => {
    const subjectNAme = this.refs.odabirPredmeta.value
    const typeOfExam = this.refs.odabirTipIspita.value
    if(typeOfExam != "Usmeni" && typeOfExam != "Uvid") {
      const {data} = axios.get('http://si2019charlie.herokuapp.com/predmet/' + subjectNAme + '/' + typeOfExam)
      if(data > 4 || (data > 3 && typeOfExam == "Integralni")){
        e.preventDefault();
        this.setState({validationError: true})
        this.setState({validationErrorMessage : "Odabrani tip ispita je kreiran maksimalno puta"})
      }
    }
  }


  render(){
    return(
    <div class="container-fluid" style={{marginTop: "30px"}}>
        <h2 style={{marginBottom: "30px"}}>Kreiraj ispit</h2>

        <div class="card align-items-center">
          <div class="card-body" style={{minWidth: "100%"}}>
          <div class="row justify-content-lg-around justify-content-md-center">
          <div class="col-lg-4 col-sm-12 col-md-6 justify-content-sm-center ">
            <h4 class="card-title">Kreiranje ispita</h4>
            <h6 class="card-subtitle mb-2 text-muted">Ovdje je potrebno izabrati predmet za koji se želi kreirati ispit, kao i tip ispita.</h6>
            <div style={{textAlign: "left"}}>
            <label class="col-form-label col-form-label-lg" htmlFor="odabirPredmeta">Odaberite predmet: </label>
            </div>
            <select class="custom-select"  id="odabirPredmeta" >
              {this.renderOptions()}
            </select>
            <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="odabirTipIspita">Tip ispita: </label>
              </div>   
                <select class="custom-select" id="odabirTipIspita" >
                    <option>Prvi parcijalni</option>
                    <option>Drugi parcijalni</option>
                    <option>Integralni</option>
                    <option>Usmeni</option>
                    <option>Uvid</option>
                </select>
                
                <div style={{textAlign: "left"}}>
            <label class="col-form-label col-form-label-lg" htmlFor="brojStudenata">Broj studenata na predmetu: </label>
             </div> 
             <div style={{textAlign: "left"}}> 
              <label class="col-form-label col-form-label-lg" id="brojStudenata">{this.brojStudenata()}</label></div>
            <div style={{float: "right"}}>
              
           
                  <button type="button" class="btn btn-primary" id="kreirajDugme" style={{marginTop: "20px", marginRight: "10px"}} onClick={() => this.props.onChangeActiveId(2)}>Kreiraj</button>
                  <Link to="/fox/ispiti"> 
                    <button type="button" class="btn btn-primary" id="nazadDugme" style={{marginTop:"20px"}}>Nazad</button>
                  </Link>
            </div> 
              
              
              
            
            </div> 
            </div>
            </div> 
            </div> 

            

            </div>
            
            
     
    )
  }
}

export default KreirajIspit