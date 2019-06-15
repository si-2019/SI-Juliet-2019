import React, { Component } from "react";
import Predmet from "../Predmet/Predmet";
import Modal from 'react-responsive-modal';
class ListaPredmeta extends Component {

  constructor(props) {
    super(props);
    this.state = {
        activeDivId: 1,
    };
};

changeActiveId(id){
    this.props.triggerChangeActiveId(id)
}

render() {
    return (
        <div >
            <button 
                type="button" 
                className="btn btn-primary left-buttons" 
                id = "moj"
                onClick = {()=>this.changeActiveId(1)}>Softver Inženjering
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>this.changeActiveId(2)}>Vještačka Inteligencija
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>this.changeActiveId(3)}>Projektovanje Informacionih sistema
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>this.changeActiveId(4)}>Administracija Računarskih Mreža
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>this.changeActiveId(4)}>Završni rad
            </button>



        </div>
        
    );
}
};
    /*
      <div class="list-group " style={{margin:-5}}>
      <a href="#" class="list-group-item list-group-item-action active">
        Softver Inženjering
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Vještačka Inteligencija
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Projektovanje Informacionih sistema
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Administracija Računarskih Mreža
      </a>
      <a href="#" class="list-group-item list-group-item-action disabled">
        Završni Rad
      </a>
    </div>*/


     


export default ListaPredmeta;
