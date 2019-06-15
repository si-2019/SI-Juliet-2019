import React, { Component } from 'react'
import { MdFileUpload, MdImage } from 'react-icons/md'
import { IconButton, Tooltip } from '@material-ui/core';
import { AddAPhoto, CloudUpload } from '@material-ui/icons';

class UploadFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: [],
            images: [],
            fileName: '',
            imageName: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    handleChange(e) {
        this.setState({
            files: e.target.files,
            fileName: e.target.files[0].name
        })
    }

    handleImageChange(e) {
        this.setState({
            images: e.target.files,
            imageName: e.target.files[0].name
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.fileName){
            let file = this.state.files[0];
            if(file){
                this.props.onSubmit(file);
                this.setState({
                    files: [],
                    fileName: ''
                })
    
                document.getElementsByName('file')[0].value = null; 
            }
        } else if(this.state.imageName){
            let image = this.state.images[0];
            if(image){
                this.props.onSubmit(image);
                this.setState({
                    images: [],
                    imageName: ''
                })
    
                document.getElementsByName('image')[0].value = null; 
            }
        }
        else console.log('Ćorak...');
    }

    handleUploadClick(){
        this.resetState();
        document.getElementsByName('file')[0].click();
    }

    handleImageUpload(){
        this.resetState();
        document.getElementsByName('image')[0].click();
    }

    resetState(){
        this.setState({
            files: [],
            images: [],
            fileName: '',
            imageName: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row" name="fileForm" encType="multipart/form-data" style={formStyle}>
                <Tooltip title="Upload file">
                    <IconButton style={{color: '#2C3E50'}} onClick={() => {this.handleUploadClick()}}>
                        <CloudUpload />
                    </IconButton>
                </Tooltip>
                <div> {this.state.fileName} </div>


                <Tooltip title="Upload image">
                    <IconButton style={{color: '#2C3E50'}} onClick={() => {this.handleImageUpload()}}>
                        <AddAPhoto />
                    </IconButton>
                </Tooltip>
                <div> {this.state.imageName} </div>


                <input className="col" type="file" name="image" files={this.state.images} onChange={this.handleImageChange} 
                    accept={['image/jpeg', 'image/png', 'image/gif']} style={fileStyle}/>

                <input className="col" type="file" name="file" files={this.state.files} onChange={this.handleChange} 
                    style={fileStyle} />

                <button className="col btn btn-outline-primary rounded juliet-submit" style={uploadStyle}>Upload</button>
            </form>
        )
    }
}

const formStyle = {
    width: '100%',
    justifyContent: 'center',
    // marginLeft: '1em',
    // marginRight: '1em',
    margin: 'auto',
    height: '40%',
    padding: '4px 0 4px 0'
}

const fileStyle = {
    visibility: 'hidden',
    width: '20%'
}

const uploadStyle = {
    width: '3em',
    float: 'right',
    color: 'white',
    background: '#2C3E50'
}

export default UploadFile;
