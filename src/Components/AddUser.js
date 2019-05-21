import React, { Component } from 'react';
import '../styles/AddUser.css';
class AddUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({
            userName: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.addUser(this.state.userName);
        this.setState({
            userName: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="add-user-form">
            <input className="input-group mb-3 message-input" type="text" style={inputStyle}
            placeholder="Add User" onChange={this.handleChange} value={this.state.userName} />
            <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Add" />
        </form>
        )
    }
}
const buttonStyle = {
    height: '40%',

}

const inputStyle = {
    width: '100%',
    padding: '0'
}
export default AddUser;