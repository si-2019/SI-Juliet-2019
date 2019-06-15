import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Fotografija extends Component {
    state = {
        StudentID: 1
    }
    
    
    render() {
        return (
            <div style={{ display: "inline-block" }}>
                <img class="rounded-circle" style={{  height:"350px", width:"350px", display: "block" }} src={this.props.fotografija} />
            </div>
                );
            }
        }
        
        export default Fotografija;
