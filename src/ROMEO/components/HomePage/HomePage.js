import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './homePage.css';
import ModalChangeLog from './ModalChangeLog.js'

class HomePage extends Component {

  constructor(props) {
      super(props)

      let logiran = true
      const token = localStorage.getItem("token");
      if(token == null) {
          logiran = false
      }

      this.state = {
          logiran
      }  
  }

  componentDidMount() {
    document.title = 'Home Page'
    if(this.refs.modal) {
      this.refs.modal.show()
    }
  }

  Odjavi = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.reload();
    this.props.history.push("/romeo/login");
  }

  render () {
    if (!this.state.logiran) {
      return <Redirect to="/romeo/login" />
    }
    return (
      <div className="App" >
      <button onClick={() => this.refs.modal.show()} >Prikazi log</button>

        <div className="header" >
          <img 
            src="http://etf.unsa.ba/etf/css/images/etf-dugi.gif"
            alt="new"
          />
          <h1>Dobro dosli na home page</h1>
          <input type="button" name="odjava" id="odjava" value="Odjavi se" onClick={this.Odjavi} />
        </div>
        <div className="main">
          
        </div>
        <div className="menu">
          
        </div>
        <div className="footer">
          Elektrotehnički fakultet u Sarajevu
        </div>
        <ModalChangeLog container={this} ref = "modal" />
      </div>
      
    );
  }
}

export default HomePage;
