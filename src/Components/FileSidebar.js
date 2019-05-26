import React, { Component } from 'react';
import Axios from 'axios';
import '../styles/FileSidebar.css'


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
            <div>
                <h3 style={{marginTop: '1rem', marginBottom: '1rem'}}>Shared files</h3>

                <ul style={{maxHeight: '300px'}}>
                {
                    this.state.files ? 
                        this.state.files.map((file, index) => (
                            <li key={index} className='file' onClick={() => {this.handleItemClick(file.naziv)}}> 
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