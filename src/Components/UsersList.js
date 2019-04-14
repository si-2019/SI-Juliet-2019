import React, { Component } from 'react';

class UsersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: this.props.users
        }
    }

    render(){
        if(this.props.users){
            return(
                <div style={{color: 'white'}}>
                    <ul>
                        {this.props.users.filter((user) => user.presence.state === 'online').map((user, index) => {
                            return <li> {user.name} </li>
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