import React, { Component } from 'react';

class Navbar2 extends Component {
  state = {}
    render() {
      return (
        <div className="Navbar2_className">
            <a style={{color: 'white', padding: '3px'}} href="student">Student</a>
            <a style={{color: 'white', padding: '3px'}} href="unos_podataka">Unos podataka</a>
            <a style={{color: 'white', padding: '3px'}} href="ispiti">Ispiti</a>
            <a style={{color: 'white', padding: '3px'}} href="obavijesti">Obavijesti</a>
            <a style={{color: 'white', padding: '3px'}} href="zadace">Zadace</a>
            <a style={{color: 'white', padding: '3px'}} href="ankete">Ankete</a>
            <a style={{color: 'white', padding: '3px'}} href="statistika">Statistika</a>           
            <a style={{color: 'white', padding: '3px'}} href="raspored">Raspored</a>
            <a style={{color: 'white', padding: '3px'}} href="chat">Chat</a>
            <a style={{color: 'white', padding: '3px'}} href="forum">Forum</a>
            <a style={{color: 'white', padding: '3px'}} href="materijali">Materijali</a>
        </div>
      );
    }
  }
  
  export default Navbar2;