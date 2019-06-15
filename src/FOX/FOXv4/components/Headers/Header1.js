import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Navbar1 from '../Navbar/Navbar1';
import "./index.css";

class Header1 extends Component {
    render() {
    return (
        <div className="Header1">
            <Navbar >               
                <Navbar1/>
            </Navbar>            
        </div>
    );
    }
}

export default Header1;