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
                placeholder="Add user to the room..." onChange={this.handleChange} value={this.state.userName} />
                <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Add" />
            </form>
        )
    }
}
const buttonStyle = {
    width: '25%',
    color: 'white',
    background: 'rgb(0,0,0,0.6)',
}

const inputStyle = {
    width: '72%',
    marginRight: '3%',
    padding: '3px 6px',
    borderRadius: '10px',
    border: 'border-right: 1px solid rgb(0,0,0,0.2)',
    display: 'inline-block',
    border: '0.5px solid rgb(0, 0, 0, 0.6)'

}
export default AddUser;