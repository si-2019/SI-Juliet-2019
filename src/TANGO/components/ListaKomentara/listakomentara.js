import React, {Component} from 'react';
import Komentari from '../Komentar';
import DugmeZaSort from '../DugmeZaSort';
import Paginacija from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Komentar from '../Komentar';
import ObjaviKomentar from '../ObjaviKomentar';
//import LISTA_PROBNA from './LISTA';
import {Link} from 'react-router-dom';

const themesApi= 'http://localhost:31919/getReplys/'; //plus id teme

class ListaKomentara extends Component {
    constructor() {
        super();
        this.state = {
          komentari:[],
          podnizKomentara: [],
          trenutnaStranica: 1,
          maxPoStranici: 10,
          obrnut: false,
          nazivTeme :'',
          id: 1
        };        
      }

    componentWillMount(){
        const url=window.location;
        let noviUrl=new URL(url);
        const idTeme=noviUrl.searchParams.get('idTheme');
        this.setState({id:idTeme});

        this.setState({ucitavanje:true});
        fetch(themesApi+idTeme) 
          .then(response=>response.json())
          .then(komentari=>{
            var ts= this.state.trenutnaStranica - 1;
            var leng= this.state.komentari.length;
            this.setState({komentari:komentari, ucitavanje:true});
            var ts= this.state.trenutnaStranica - 1;
            var leng= this.state.komentari.length;
            var pocetniPodniz = this.dajPodniz(ts,(leng>=10) ? 10 : leng);
            this.setState({komentari:komentari, podnizKomentara: pocetniPodniz, ucitavanje:false})
          });
       // this.setState({komentari:LISTA_PROBNA,ucitavanje:false});
    }


    promjeniStateNiza (niz, obrnut, vm) {
        let newState = this.state;
        const trSt= this.state.trenutnaStranica - 1;
        const mPS= this.state.maxPoStranici;
        const ukBrKom=this.state.komentari.length;
        var poc = trSt*mPS;
        if(poc + mPS > ukBrKom)
          var kr = ukBrKom;
        else var kr = poc + mPS;
        var podnizKomentara = this.dajPodniz(trSt*mPS, kr);
        newState = {
          komentari:niz,
          podnizKomentara: podnizKomentara,
          obrnut: obrnut
        }
        this.setState(newState);        
      }
      
      dajPodniz = (pocetak, kraj) =>{
        var komentari=this.state.komentari;
        var podnizKomentara= komentari.slice(pocetak, kraj);
        return podnizKomentara;
      }

      handlePromjenuStranice = stranica => {
        const trenutnaStranica= stranica - 1;
        const maxPoStranici= this.state.maxPoStranici;
        const ukupanBrojKomentara=this.state.komentari.length;
        var pocetak = trenutnaStranica*maxPoStranici;
        if(pocetak + maxPoStranici > ukupanBrojKomentara)
          var kraj = ukupanBrojKomentara;
        else var kraj = pocetak + maxPoStranici;
        var podnizKomentara = this.dajPodniz(pocetak, kraj);
        this.setState({ucitavanje:true});
        this.setState({
            podnizKomentara: podnizKomentara,
            trenutnaStranica: stranica,
            ucitavanje : false
        })
      }
    
      render(){
        
        if(this.state.ucitavanje){
          return <p>Ucitavanje...</p>
        }
          return(
            <div>
              
                 <Link to ={{
                    pathname: '/Tango/Teme',
                  
                  }}>
          <button color="primary" className="btn btn-primary my-1 btn-sm" >Povratak</button>
          </Link>
              <div>
                <DugmeZaSort 
                  komentari={this.state.komentari} 
                  sortirajNiz={this.promjeniStateNiza.bind(this)}
                  obrnut={this.state.obrnut}
                />
              </div>
              <div>
                <input type='text' class="form-control bg-white rounded" value="Search"></input>
              </div>
            <div>
            <Komentari komentari={this.state.komentari}/>
            </div>
            <div>
            <ObjaviKomentar id={this.state.id} nazivTeme={this.state.nazivTeme}/>
              </div>
            <div>
              <Paginacija onChange={this.handlePromjenuStranice} current={this.state.trenutnaStranica} total={this.state.komentari.length}/>
            </div>
            </div>
          );
      }
}
 
export default ListaKomentara;