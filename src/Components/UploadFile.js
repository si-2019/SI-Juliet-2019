import React, { Component } from 'react'

class UploadFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            files: e.target.files
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let file = this.state.files[0];
        if(file){
            this.props.onSubmit(file);

            this.setState({
                files: []
            })

            document.getElementsByName('file')[0].value = null; // cistimo polja
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row" name="fileForm" encType="multipart/form-data">
                <input className="col" type="file" name="file" files={this.state.files} onChange={this.handleChange} required />  
                <input className="col" type="submit" value="Upload"/>     
            </form>
        )
    }
}

export default UploadFile;
