import React, { Component } from 'react';
import PregledDetaljaPredmeta from './PregledDetaljaPredmeta';
import ListaGrupa from './PrikazListeProjektnihGrupa';

class ListaPredmetaAsistenta extends Component {
  constructor(props){
    super(props);
    this.state = {
      idAsistent:this.props.idAsistent,
      predmeti:this.props.predmeti,
      detalji:false,
      detaljiIndex:0
    };
    this.azuriraj=this.azuriraj.bind(this);
  }
   render(){
    if(this.state.detalji) return (
      <div className="card" style={{float: "left", width:"100%"}}>
        <div className="card-body">
          <h4 className="card-title" style={{textAlign:"left"}}>Pregled projekata</h4>
				  {/*<div className="col-md-auto" align="left">
            <div className="col-6" align="left">*/}
              <select id="selectListe" className="custom-select" onChange={()=>(
                this.azuriraj(document.getElementById("selectListe").selectedIndex)
              )}>
                <option className="list-group-item">Odaberite predmet</option>
                {
                  this.state.predmeti.map(predmet=>{
                    return <option className="list-group-item">{predmet.naziv}</option>
                  })
                }
              </select>
              <PregledDetaljaPredmeta naziv={this.state.predmeti[this.state.detaljiIndex].nazivProjekta} 
              opis={this.state.predmeti[this.state.detaljiIndex].opis} 
              bodovi={this.state.predmeti[this.state.detaljiIndex].moguciBodovi} 
              brojGrupa={20}/>
              <ListaGrupa/>
            
        </div>
      </div>
    )
    else return(
      <div className="card" style={{float: "left", width:"100%"}}>
        <div className="card-body">
          <h4 className="card-title" style={{float:"left"}}>Pregled projekata</h4>
				  {/*<div className="col-md-auto" align="left">
            <div className="col-6" align="left">*/}
              <select id="selectListe" className="custom-select" onChange={()=>(
                this.azuriraj(document.getElementById("selectListe").selectedIndex)
              )}>
                <option className="list-group-item">Odaberite predmet</option>
                {
                  this.state.predmeti.map(predmet=>{
                    return <option className="list-group-item">{predmet.naziv}</option>
                  })
                }
              </select>
           
        </div>
      </div>
    )
  }
  azuriraj(indeks){
    /*var ajax=new XMLHttpRequest();
    var komponenta=this;
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status=="200"){
					var tekst=ajax.responseText;
					if(tekst.length==0) return;
					var json=JSON.parse(tekst);
					komponenta.setState(state=>({
            idAsistent:state.idAsistent,
            predmeti:state.predmeti,
            detalji:true,
            detaljiJSON:json
          }))
				}
				else if(ajax.status!="200"){
					komponenta.setState(state=>({
            idAsistent:state.idAsistent,
            predmeti:state.predmeti,
            detalji:true,
            detaljiJSON:state.detaljiJSON
          }))
				}
		}
		ajax.open("POST","http://localhost:31913/services/viewA/getProject",true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("idPredmet=4");*/
    this.setState({
      detaljiIndex:indeks-1,
      detalji:true
    })
  }
}

  export default ListaPredmetaAsistenta;