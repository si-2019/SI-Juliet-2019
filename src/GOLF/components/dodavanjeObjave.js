import React, { Component } from 'react'
import axios from 'axios'
import './golf.css'

class DodavanjeObjave extends Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            id: "",
            naziv: ""
        }
    }


    componentDidMount(){
        axios.get(`http://localhost:31907/r1/nazivTrenutneAkademskeGodine`).then(res => {
        this.setState({
            id: res.data.id,
            naziv: res.data.naziv
        })
    })
}
    render(){
        return(

            <div>
                <div class="card sss">
                    <div class="card-body">
                        <form  encType="multipart/form-data" method="POST" action="http://localhost:31907/r1/dodajMaterijal">
                        <div class="form-group">
                            <label class="col-form-label" for="inputDefault">Naslov: </label>
                            <input type="text" class="form-control" name="naziv"></input>
                         </div>
                         <div class="form-group">
                            <label class="col-form-label" for="inputDefault">Opis: </label>
                            <textarea class="form-control" name="napomena" rows="3"></textarea>
                         </div>
                         <div class="form-group">
                            <label >Datoteke: </label>
                            <br></br>
                            <input type="file" name="fileovi" multiple></input>
                        </div>
       
                    <input type="checkbox" name="objavljeno"></input> Sakrij objavu

                    <input type="hidden" name="idPredmet" value= {`${this.props.idPredmeta}`}></input>
                    <input type="hidden" name="sedmica" value= {`${this.props.sedmica}`}></input>
                    <input type="hidden" name="idTipMaterijala" value= {`${3}`}></input>
                    <input type="hidden" name="idAkademskaGodina" value= {`${this.state.id}`}></input>
                        <button type="submit" class="btn btn-primary" id="dugmeObjavi">Objavi</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DodavanjeObjave