import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class ReturnButton extends Component {
  
    render() {
      var currentLocation = this.props.location.pathname;
      if(currentLocation==="/"){
        return (
          <a style={{color: 'black'}} disabled href="/">Nazad na početnu</a>
        )
      }
      return (
        <a style={{color: 'black'}} href="/fox">Nazad na početnu</a>
      )
    }
  }
  export default withRouter(ReturnButton);