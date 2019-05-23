import React, { Component } from 'react';
import '../styles/UsersList.css'

class UsersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: this.props.users, 
            input: '',
            user: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        this.props.blockAUser(this.state.user);
        this.setState({
            userName: ''
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
        const listSrc = this.props.users.filter(d => this.state.input === '' || d.id.includes(this.state.input));
        if(this.props.users){
            return(
                <div style={{color: 'white'}}>                
                <h2 style={{marginTop: '5rem', marginBottom: '1rem'}}>Users</h2>
                    <ul style={{overflowY: 'scroll', overflowX: 'hidden', height:'400px'}}>
                    <input placeholder="Pretraži korisnike" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>                           
                        <h4>Online users:</h4>
                        {listSrc.filter((user) => user.presence.state === 'online').map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="user" key={index} style={{cursor: 'pointer'}}>{user.name}</li>
                                               
                           
                        })}
                        <h4>Offline users:</h4>
                        {listSrc.filter((user) => user.presence.state === 'offline').map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)}
                            className="user" key={index} style={{cursor: 'pointer'}}> {user.name}</li>                                               
                        })}
                    </ul>
                    <form  onSubmit={this.onSubmit.bind(this)} >
                        <input  type="text" placeholder="Block User" onChange={this.handleChange} value={this.state.user} />
                        <input className="btn btn-outline-primary" type="submit" value="Block this user" />
                    </form>
                </div>
            )
        }
        else{
            return(
                <p>Loading...</p>
            )
        }
    }
}

export default UsersList;