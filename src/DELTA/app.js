import React from 'react';
import './AppDelta.css';
import { BrowserRouter, Route } from "react-router-dom";
import Modal from 'react-responsive-modal'; 
import Predmet from "./components/Predmet/Predmet";
import ListaPredmeta from "./components/ListaPredmeta/ListaPredmeta"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,  //open pokazuje da li formu treba prikazati ili ne
      activeContentId: 1
    };
  }

  //Funkcija kojom se otvara forma
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    window.confirm('Prekinuti pisanje issuea?') && this.setState({ open: false });
  };

  onCloseModalAndSaveAsDraft = () => {
    window.confirm('Save issue as draft and close?') && this.setState({ open: false });
  };

  onChangeActiveId = (id) => {
    this.setState({
      activeContentId: id,
    })
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <div className="App">

          <div className="row" >

            <div id = "main">
              <div id = "left">
                <ListaPredmeta triggerChangeActiveId = {this.onChangeActiveId}/>
              </div>
              <div id = "right">
                <div 
                    id = "TrackIssuesContent" 
                    style={{display : this.state.activeContentId == 1 ? 'inherit' : 'none'}}
                ><Predmet/>
                </div>
                <div 
                    id = "DraftsContent" 
                    style={{display : this.state.activeContentId == 2 ? 'inherit' : 'none'}}
                ><Predmet/>
                </div>
                <div 
                    id = "Archived" 
                    style={{display : this.state.activeContentId == 3 ? 'inherit' : 'none'}}
                > <Predmet/>
                </div>

                <div 
                    id = "FAQContent" 
                    style={{display : this.state.activeContentId == 4 ? 'inherit' : 'none'}}
                >
                 <Predmet/>
                 </div>

                 
                
              </div>
            </div>

          </div>    
          
          <Modal
            open={open}
            center
            id ="modal"
            onClose={() => {}}
            showCloseIcon={false}
          >
            <div id="overlay">
            </div>
          </Modal>
          
        </div>
      </div>
    );
  }
}

export default App;