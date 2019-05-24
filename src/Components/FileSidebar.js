import React, { Component } from 'react';
import Axios from 'axios';
import '../styles/FileSidebar.css'


class FileSidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            files: [],
            input:''

        }

        this.handleItemClick = this.handleItemClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
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
    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }

    render(){




        //Filter
        const resultFiles = this.state.files.filter(f => this.state.input === '' || f.naziv.toLowerCase().includes(this.state.input.toLowerCase()) || f.posiljaoc.toLowerCase()===this.state.input.toLowerCase() );
        return(
            <div>
                <h3 style={{marginTop: '1rem', marginBottom: '1rem'}}>Shared files</h3>
                <input className="pretragaFajlovaText" placeholder="Search files..." style={fileSearchCSS} value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
                <ul style={{maxHeight: '300px', overflowY: 'scroll'}}>
                {
                    resultFiles ? 
                    resultFiles.map((file, index) => (
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

const fileSearchCSS ={
    paddingLeft:'2%',
    marginBottom:'1%'
};
export default FileSidebar;