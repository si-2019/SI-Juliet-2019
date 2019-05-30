import React, { Component } from 'react';
import Axios from 'axios';
import '../styles/UsersList.css'

class FileSidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            files: []
        }

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentWillMount(){
        Axios.get('http://localhost:31910/files')
        .then(res => 
            this.setState({
                files: res.data
            })
        )
        .catch(err => console.log(err));
    }

    handleItemClick(name){
        this.props.downloadClick(name);
    }

    render(){
        return(
            <div style={{width: '100%', padding: '10px 0'}}>     
                <div className="section-h" onClick={(e) => {
                        let node = document.getElementById('shared-files')
                        let display = node.style.display;
                        node.style.display = display == "block" ? 'none' : "block";
                        node = document.getElementById('arrow-files');
                        let innerHTML = node.innerHTML; 
                        node.innerHTML = innerHTML == "keyboard_arrow_right" ? "keyboard_arrow_down" : "keyboard_arrow_right"
                    }}>
                    <div className="section-header"><h5>Shared files</h5></div>
                    <i id="arrow-files" class="material-icons-outlined md-14">keyboard_arrow_right</i>
                </div> 
                <ul style={{overflowX: 'hidden', height:'80%', margin: '0', display: 'none'}} id="shared-files">
                {
                    this.state.files ? 
                        this.state.files.map((file, index) => (
                            <li key={index} className='user' onClick={() => {this.handleItemClick(file.naziv)}}> 
                                { file.posiljaoc + ': ' + file.naziv} 
                            </li>
                        ))
                    :
                    null
                }
                </ul>
                
            </div>
        )
    }
}

export default FileSidebar;