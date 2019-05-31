import React, { Component } from 'react';
import NewEventForm from './NewEventForm';
import Axios from 'axios';
import '../styles/EventPlanner.css';

class BlockedUsers extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        this.props.blockAUser(this.state.user);
        this.setState({
            user: ''
        })
    }
    onChangeHandlerBlock(e){
        this.setState({
            user: e.target.value,
          });
    }
    handleChange(e) {
        this.setState({
            user: e.target.value
        })
    }

    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }

    render(){
        return(
            <form  onSubmit={this.onSubmit.bind(this)} style={{width: '100%'}}>
                <input  type="text" style={inpStyle} placeholder="Block User" onChange={this.handleChange} value={this.state.user} />
                <input className="btn btn-outline-primary" type="submit" value="Block this user" style={{width: '100%'}}/>
            </form>
        )
    }
    
}


const inpStyle = {
    borderRadius : '0.25rem',
    height: '40px',
    width: '100%',
    margin: '2px'
}

export default BlockedUsers;