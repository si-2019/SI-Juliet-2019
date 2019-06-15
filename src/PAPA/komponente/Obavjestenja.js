import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import papaApi from './papaApi';
import { TramRounded } from '@material-ui/icons';
import ColorPicker from './manjeKomponente/ColorPicker';



class ObavjestenjaPapa extends Component {

  constructor(props) {
    super(props);
    this.state = {  
                    boja:"white",
                    naslov: "Izaberite nacin prikazivanja",
                    lista:[],
                    showPredmet:false,
                    clicked: false
                 };
    this.obavjestenjaAdmin = this.obavjestenjaAdmin.bind(this); 
    this.obavjestenjaStudentskaSluzba = this.obavjestenjaStudentskaSluzba.bind(this); 
    this.obavjestenjaProfesor = this.obavjestenjaProfesor.bind(this); 
    this.obavjestenjaAsistent = this.obavjestenjaAsistent.bind(this);            
    this.upisaneOcijene = this.upisaneOcijene.bind(this); 
    this.ispitiPrijava = this.ispitiPrijava.bind(this); 
    this.rezultatiUsmenihIspita = this.rezultatiUsmenihIspita.bind(this); 
    this.rezultatiParcijalnihIspita = this.rezultatiParcijalnihIspita.bind(this); 
    this.kliknutPredmet=this.kliknutPredmet.bind(this)
  }

  promijeniBoju(novaBoja){
    this.setState({
      boja:novaBoja  
    });
  }
  
  obavjestenjaAdmin(){
    papaApi.obavjestenjaAdmin().then((res) => {
        this.setState({
          showPredmet:false,
          naslov:"Obajestenja od admina",
          lista:res.data});
    }).catch((err) => {
      this.setState({
        showPredmet:false,
        naslov:"Obavjestenja od admin",
        lista:[]});
    });
  }
  obavjestenjaStudentskaSluzba(){
    papaApi.obavjestenjaStudentskaSluzba().then((res) => {
      this.setState({
        naslov:"Obavjestenja od studentske sluzbe",
        lista:res.data,
        showPredmet:false
      });
    }).catch((err) => {
      this.setState({
        naslov:"Obavjestenja od studentske sluzbe",
        lista:[],
        showPredmet:false
      });
    });
  }
  obavjestenjaProfesor(){
    papaApi.obavjestenjaProfesor().then((res) => {
      this.setState({
        naslov:"Obajvestenja od profesora",
        lista:res.data,
        showPredmet:false
      });
    }).catch((err) => {
      this.setState({
        naslov:"Obavjestenja od profesora",
        lista:[],
        showPredmet:false
      });
    });
  }
  obavjestenjaAsistent(){
    papaApi.obavjestenjaAsistent().then((res) => {
      this.setState({
        showPredmet:false,
        naslov:"Obajvestenja od asistenta",
        lista:res.data});
    }).catch((err) => {
      this.setState({
        showPredmet:false,
        naslov:"Obajvestenja od asistenta",
        lista:[]});
    });
  }
  upisaneOcijene(){
   
  }
  ispitiPrijava(){
    papaApi.ispitiPrijava().then((res) => {
      let niz=[];
      for (let a = 0; a < res.data.length; a++ ) {
        niz.push({
          id:a,
          obavjestenje:"Prijava na "+ res.data[a].vrsta+" iz "+res.data[a].predmet + " do " +res.data[a].datum +"."
        });
      }
      this.setState({
        naslov:"Trenutne prijeva za ispit",
        lista:niz,
        showPredmet:false
      });
    }).catch((err) => {
      this.setState({
        naslov:"Trenutne prijave za ispit",
        lista:[],
        showPredmet:false
      });
    });
  }
  rezultatiParcijalnihIspita(){
    papaApi.rezultatiIspita().then((res) => {
      let niz=[];
      for (let a = 0; a < res.data.length; a++ ) {
        if (res.data[a].vrsta.includes("parcijalni")){
           niz.push({
            id:a,
            obavjestenje:res.data[a].vrsta+" iz "+res.data[a].predmet + " osvojili ste " +res.data[a].brojBodova +"."
          })
        }
      }
      this.setState({
        showPredmet:true,
        naslov:"Rezultati parcijalnih ispita",
        lista:niz});
    }).catch((err) => {
      this.setState({
        showPredmet:true,
        naslov:"Rezultati parcijalnih ispita",
        lista:[]});
    });
  }
  
  rezultatiUsmenihIspita(){
    papaApi.rezultatiIspita().then((res) => {
      let niz=[];
      for (let a = 0; a < res.data.length; a++ ) {
        if (res.data[a].vrsta.includes("zavrs")){
           niz.push({
            id:a,
            obavjestenje:res.data[a].vrsta+" iz "+res.data[a].predmet + " osvojili ste " +res.data[a].brojBodova +"."
          })
        }
      }
      this.setState({
        showPredmet:true,
        naslov:"Rezultati usmenih ispita",
        lista:niz});
    }).catch((err) =>{
      this.setState({
        showPredmet:true,
        naslov:"Rezultati usmenih ispita",
        lista:[]});
    });
  }
  kliknutPredmet(){
    if(this.state.showPredmet){
        this.props.fija();      
    }
  }
  render() {
    return (
      <div style={{ width: '100%', height: '22rem'}}>
        <Card border="secondary" style={{ width: '100%', minHeight: '22rem', backgroundColor:this.state.boja}}>
        <Card.Header className='bg-primary'>
          <div style={{width: '100%',  display: 'flex',justifyContent:'space-between'}}>
            {<h3 style={{color:"white"}} >Obavijesti</h3>}
            <ButtonGroup vertical  style={{alignSelf: 'flex-end'}}>
              <DropdownButton as={ButtonGroup} title="" id="bg-vertical-dropdown-1">
                <Dropdown.Item eventKey="1" onClick={this.obavjestenjaAdmin}>Obavjestenja admin</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={this.obavjestenjaStudentskaSluzba}>Obavjestenjas studentska sluzba </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={this.obavjestenjaProfesor}>Obavjestenja profesor</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={this.obavjestenjaAsistent}>Obavjestenja asistent</Dropdown.Item>
                <Dropdown.Item eventKey="5" onClick={this.rezultatiParcijalnihIspita}>Rezultati parcijalnih ispita</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={this.rezultatiUsmenihIspita}>Rezultati usmenih usmenih</Dropdown.Item>  
                <Dropdown.Item eventKey="5" onClick={this.upisaneOcijene}>Upisane ocijene</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={this.ispitiPrijava}>Prijava ispita</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title style ={{fontWeight: "bold"}}>{this.state.naslov}</Card.Title>
          <div>
              <ul style={{listStyleType: "square"}}>
                {this.state.lista.map(item => (
                  <li style={{ margin: "1rem"}} key={item.id} onClick={this.kliknutPredmet.bind(this)} >{item.obavjestenje}</li>
                ))}
              </ul>
          </div>
        </Card.Body>
        <ColorPicker promijeniBoju={this.promijeniBoju.bind(this)}/>
      </Card>
      </div>
    );
  }
}

export default ObavjestenjaPapa;