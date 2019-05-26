import React, { Component } from 'react';
import '../styles/UsersList.css'

class UsersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: this.props.users, 
            input: '',
            currentUser: this.props.currentUser
        }
    }

    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }
    triggerAdd(user, index) {
        if(typeof this.props.currentUser.customData === "undefined"  || !Array.isArray(this.props.currentUser.customData.favoriteUsers)) {
            this.props.currentUser.customData = {
                'favoriteUsers': [user.id]
            }
        } else {
            this.props.currentUser.customData.favoriteUsers.push(user.id);
        }
        this.setState({
            currentUser: this.props.currentUser
        })
    }

    triggerDelete(user, index){
        this.props.currentUser.customData['favoriteUsers'] = this.props.currentUser.customData['favoriteUsers'].filter(function(el){
            console.log(el);
            return el !== user;
        });
        this.setState({
            currentUser: this.props.currentUser
        })
     }

    render(){
        const listSrc = this.props.users.filter(d => this.state.input === '' || d.id.includes(this.state.input));
        if(this.props.users && this.props.currentUser){
            const currentUser = this.props.currentUser;
            return(
                <div style={{color: 'black'}}>                
                <h3 style={{marginTop: '3rem', marginBottom: '0.25rem', padding: '0px'}}>Users</h3>
                    <ul style={{overflowX: 'hidden', height:'400px'}}>
                    <input placeholder="Pretraži korisnike" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
                        <h5>Favorite users:</h5>
                        {currentUser.customData && currentUser.customData.favoriteUsers && currentUser.customData.favoriteUsers.map((user, index) => {
                                return <li className="user" key={index} style={{cursor: 'pointer'}} onClick={() => this.props.openPrivateChat(user)} >
                                    <div>{user}</div>
                                    <div className="remove" onClick={(e)=>{
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.triggerDelete(user, index);
                                    }}>X</div>
                                </li>
                            })
                        }
                        
                        <h5>Online users:</h5>
                        {listSrc.filter((user) => user.presence.state === 'online' && (currentUser.customData == null || 
                            typeof currentUser.customData.favoriteUsers !== "undefined" && !currentUser.customData.favoriteUsers.includes(user.id))).map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="user" key={index} style={{cursor: 'pointer'}}>  
                                <div>{user.name}</div>
                                <div className="remove" onClick={(e)=> {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.triggerAdd(user, index);
                                }}>+</div> 
                            </li>
                        })}

                        <h5>Offline users:</h5>
                        {listSrc.filter((user) => user.presence.state === 'offline' && (currentUser.customData == null || 
                            typeof currentUser.customData.favoriteUsers !== "undefined" && !currentUser.customData.favoriteUsers.includes(user.id))).map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="user" key={index} style={{cursor: 'pointer'}}>  
                                <div>{user.name}</div>
                                <div className="remove" onClick={(e)=> {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.triggerAdd(user, index);
                                }}>+</div> 
                            </li>
                        })}
                    </ul>
                    
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