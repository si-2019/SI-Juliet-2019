import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Navbar2 from '../Navbar/Navbar2';
import "./index.css";

class Header2 extends Component {
    render() {
    return (
        <div className="Header2">
            <Navbar >               
                <Navbar2/>
            </Navbar>            
        </div>
    );
    }
}

export default Header2;