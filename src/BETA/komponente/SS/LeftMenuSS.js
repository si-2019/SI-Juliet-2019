import React from 'react';
import AddNewCategoryModal from './AddNewCategoryModal.js'


class LeftMenuStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDivId: 1,
            showNoviIssue: false,
            modalShowSS:false

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
                  id="createNewIssue"
                //  onClick={() => this.setState({ showNoviIssue: true })} >
                 >
                  Kreiraj novi upit
              </button>
              <button 
                  type="button"
                  className="btn btn-primary left-buttons"
                  id="createNewIssue"
                  onClick={() => this.setState({ modalShowSS: true })} >
                  Dodaj novu kategoriju
              </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons" 
                    id = "moj"
                    onClick = {()=>this.changeActiveId(1)}>Prati upite
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(2)}>Draftovi
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(3)}>Arhiva
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(4)}>Često postavljani upiti
                </button>
    
              
                 <AddNewCategoryModal
                    
                    show={this.state.modalShowSS}
                    naslovModala="Dodaj novu kategoriju"
                    btnPotvrdi="Dodaj kategoriju"
                    onHide={() => this.setState({modalShowSS: false})}
                    
                    

                />

            </div>
            
        );
   }
};

export default LeftMenuStudent;