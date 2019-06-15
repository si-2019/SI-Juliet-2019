import React, {Component} from 'react'; 
import ListaZadataka from './PrikazListeZadataka';
import { thisExpression } from '@babel/types';

class PregledListeProjekata extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            projekti:[],
            zadaci:[], 
            postoje_projekti:false, 
            lista:false,
            zadatak:false,
            odabrani_projekat:null,
            odabrani_zadatak:null,
            
            id_odabranog_projekta:null,
            opis_zadatka:null,
            datum_pocetka:null,
            datum_zavrsetka:null,
            zavrsen:null,
            komentar_asistenta:null
            };

        this.popuniPodatke=this.popuniPodatke.bind(this);
        this.klik=this.klik.bind(this);
        this.promjenaZadatka=this.promjenaZadatka.bind(this);
    }

    componentDidMount() {
        //let proj=sviProjektiTrenutnogUsera().projekti;
        var z1={idProjektnogZadatka:1,idProjekta:1,opis:"Prvi zadatak, uvod opisi", otkad:"24.3.2015.",dokad:"6.5.2016.",zavrsen:0,komentarAsistenta:"Sve je ok."};
        var nizZadaci=[];
        nizZadaci.push(z1);
        this.setState({projekti:this.props.projekti, postoje_projekti:true, odabrani_projekat:1, odabrani_zadatak:1});
        //this.setState({id_odabranog_projekta:nizZadaci[0].idProjekta,opis_zadatka:nizZadaci[0].opis,datum_pocetka:nizZadaci[0].otkad,datum_zavrsetka:nizZadaci[0].dokad,komentar_asistenta:nizZadaci[0].komentarAsistenta});
    }

    kreirajTabelu() {
        return(
            <div class ="card m1-3 h-100"> 
            <form  >
            <table id="tabelaProjekata" className="table table-dark table-bordered text-center border-solid">
                <thead  >
                    <tr className="bg-primary text-dark">
                        <th class="tabtip" >Naziv projekta</th>
                        <th class="tabtip">Naziv predmeta</th>
                        <th class="tabtip">Opis projekta</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        this.state.postoje_projekti != false ? 
                        this.state.projekti.map((projekti) => {
                            return (
                                <tr className="bg-primary text-dark">
                                    <td onClick={()=>this.klik(projekti.idProjektnaGrupa)}>{projekti.nazivProjekta}</td>
                                    <td>{projekti.naziv}</td>
                                    <td>{projekti.opis}</td>
                                </tr>
                            )
                        }):""
                    }
                    
                </tbody>
            </table>
            </form>
            </div>
        );
    }

    kreirajListuZadataka(){
        return (
            <form>
                <fieldset>
                <div>
                    <select class="custom-select" style={{align:"left"}} id="lista" onChange={this.promjenaZadatka}>
							{
								this.state.zadaci.map(zadatak=>{
									return <option>Zadatak {zadatak.idProjektniZadatak}</option>
								})
							}
					</select>      
                </div>
                </fieldset>
            </form>
        )
      }

    kreirajDetaljeZadatka() {
        return (
            <form id="detaljiZadatka" style={{textAlign:"left"}}>
                <label className="col-form-label col-form-label-lg">Opis zadatka:</label>
                <br/>
                <label> {this.state.opis_zadatka}</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Datum pocetka:</label>
                <br/>
                <label>{this.state.datum_pocetka}</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Datum zavrsetka:</label>
                <br/>
                <label> {this.state.datum_zavrsetka}</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Zavrsen:</label>
                <br/>
                <label>{this.state.zavrsen}</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Komentar asistenta:</label>
                <br/>
                <label> {this.state.komentar_asistenta}</label>
            </form>
        );
    }

    render() {
        if(!this.state.lista)
        return(  
            <div className="card" style={{float: "left", width:"100%"}}>
                <div className="card-body">
                    <h4 class="card-title" style={{textAlign:"left"}}>Pregled projekata</h4>
                    <br/>
                    <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Svi projekti:</h6>
                    {this.kreirajTabelu()}
                </div>
            </div>
        );
        else return(
            <div className="card" style={{float: "left", width:"100%"}}>
                <div className="card-body">
                    <h4 class="card-title" style={{textAlign:"left"}}>Pregled projekata</h4>
                    <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Svi projekti:</h6>
                    {this.kreirajTabelu()}
                    <br/>
                    <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Odaberite zadatak</h6>
                    {this.kreirajListuZadataka()}
                    <br/>
                    <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Zadatak {this.state.odabrani_zadatak}</h6>
                    {this.kreirajDetaljeZadatka()}
                </div>
            </div>
        );
    }
    popuniPodatke() {
        var ajax=new XMLHttpRequest();
        var id_usera=1;
        ajax.open('GET', 'http://localhost:31913/services/viewS/user-projects/:id'+id_usera, true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send();
        ajax.onreadystatechange= function() {
            if (ajax.readyState==4 && ajax.status==200) {
                var podaci= JSON.parse(ajax.responseText);
                if(podaci.length==0) this.nafilujPodatke();
                else this.setState({projekti:podaci});
                if (podaci.length != null) this.setState({postoje_projekti:true});
                for(var i=0; i<podaci.length; i++) {
                    if (podaci[i].idProjekat==this.state.odabrani_projekat) {
                        this.setState({id_odabranog_projekta:podaci[i].zadaci[this.state.odabrani_zadatak].idProjekta,
                            opis_zadatka:podaci[i].zadaci[this.state.odabrani_zadatak].opis,
                            datum_pocetka:podaci[i].zadaci[this.state.odabrani_zadatak].otkad,
                            datum_zavrsetka:podaci[i].zadaci[this.state.odabrani_zadatak].dokad,
                            zavrsen:podaci[i].zadaci[this.state.odabrani_zadatak].zavrsen,
                            komentar_asistenta:podaci[i].zadaci[this.state.odabrani_zadatak].komentarAsistenta
                        });
                    }
                }
            }
        }
    }
    klik(grupa){
        var ajax=new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:31913/services/viewA/getZadaci/'+grupa, true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send();
        var komponenta=this;
        ajax.onreadystatechange= function() {
            if (ajax.readyState==4 && ajax.status==200) {
                var podaci= JSON.parse(ajax.responseText);
                if(podaci.length==0) this.nafilujPodatke();
                else {
                    var zavrsenTekst="Da";
                    if(!podaci[0].zavrsen) zavrsenTekst="Ne";
                    komponenta.setState({
                        zadaci:podaci, 
                        lista:true, 
                        opis_zadatka:podaci[0].opis,
                        datum_pocetka:podaci[0].datumPocetka,
                        datum_zavrsetka:podaci[0].datumZavrsetka,
                        komentar_asistenta:podaci[0].komentarAsistenta,
                        zavrsen:zavrsenTekst  
                    });
                }
            }
        }
    }
    promjenaZadatka(){
        var o=document.getElementById("lista").selectedIndex;
        var zavrsenTekst="Da";
        console.log(this.state.zadaci[o]);
        if(!this.state.zadaci[o].zavrsen) zavrsenTekst="Ne";
        this.setState(state=>({
            opis_zadatka:state.zadaci[o].opis,
            datum_pocetka:state.zadaci[o].datumPocetka,
            datum_zavrsetka:state.zadaci[o].datumZavrsetka,
            komentar_asistenta:state.zadaci[o].komentarAsistenta,
            zavrsen:zavrsenTekst  
        }));
    }
}
export default PregledListeProjekata;
