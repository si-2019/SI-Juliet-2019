import React, { Component } from 'react'

class FileSidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            fileNames: []
        }
    }

    render(){
        return(
            <div>
                {this.props.dummy}
            </div>
        )
    }
}

export default FileSidebar;