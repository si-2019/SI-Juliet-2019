import React, { Component } from 'react'

class UredjivanjeOPredmetu extends Component{
    render(){
        return(
            <div className="card border-success mb-3">
                <div className="card-header">
                    <a href="#"><h4>Dodavanje objave</h4></a>
                </div>
                <div className="card-body">
                    <form>
                        Opis: <br></br>
                        <textarea rows="4" id="opisPredmeta"  name="opisPredmeta" class="form-control mr-sm-2"cols="2000"></textarea>
                       <br></br>
                       <button>Uredi</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UredjivanjeOPredmetu

