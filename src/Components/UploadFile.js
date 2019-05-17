import React, { Component } from 'react'
import { MdFileUpload, MdImage } from 'react-icons/md'

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
                <MdFileUpload size='2.5em' onClick={() => {this.handleUploadClick()}}/>
                <div> {this.state.fileName} </div>

                <MdImage size='2.5em' onClick={() => {this.handleImageUpload()}}/>  
                <div> {this.state.imageName} </div>

                <input className="col" type="file" name="image" files={this.state.images} onChange={this.handleImageChange} 
                    accept={['image/jpeg', 'image/png', 'image/gif']} style={fileStyle}/>

                <input className="col" type="file" name="file" files={this.state.files} onChange={this.handleChange} 
                    style={fileStyle} />

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
    width: '20%'
}

const uploadStyle = {
    width: '3em'
}

export default UploadFile;
