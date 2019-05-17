import React, { Component } from 'react'
import { MdFileUpload } from 'react-icons/md'

class UploadFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: [],
            fileName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            files: e.target.files,
            fileName: e.target.files[0].name
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let file = this.state.files[0];
        if(file){
            this.props.onSubmit(file);
            console.log(file);
            this.setState({
                files: []
            })

            document.getElementsByName('file')[0].value = null; 
        }
    }

    handleUploadClick(){
        document.getElementsByName('file')[0].click();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row" name="fileForm" encType="multipart/form-data" style={formStyle}>
                <MdFileUpload size='2.5em' onClick={() => {this.handleUploadClick()}}/>
                <div> {this.state.fileName} </div>  
                <input className="col" type="file" name="file" files={this.state.files} onChange={this.handleChange} 
                    style={fileStyle} required />
                <input className="col btn-outline-primary" type="submit" value="Upload" style={uploadStyle}/>     
            </form>
        )
    }
}

const formStyle = {
    width: '90%',
    justifyContent: 'center',
    marginLeft: '1em',
    marginRight: '1em'
}

const fileStyle = {
    visibility: 'hidden',
    width: '10%'
}

const uploadStyle = {
    width: '30%'
}

export default UploadFile;
