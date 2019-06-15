import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Kreiranje from './kreiranje/app'
import Popunjavanje from './popunjavanje/app'
import Rezultati from './rezultati/app'
import Liste from './liste/app'
import Uredi from './uredi'
import {Redirect} from 'react-router'
let Home = function () { 
    return <Redirect to='/hotel/liste/mojeankete' />
}
export default class Hotel extends React.Component {
    constructor(props) {
        super(props)
        this.changePage = this.changePage.bind(this)
        this.state = {
            page: 'moje ankete'
        }
    }
    changePage(e) {
        
        let str = e.target.name
        let url = '/hotel/mojeAnkete'
        if(str == "mojeAnkete")
            url = '/hotel/liste/mojeAnkete'
        else if(str == 'kreirajAnketu')
            url = '/hotel/kreiranje'
        else if(str == 'popuniAnketu')
            url = '/hotel/liste/javneAnkete'
        else if(str == 'javneAnkete')
            url = '/hotel/liste/javneAnkete'
        else if(str == 'rezultatiAnketa')
            url = '/hotel/liste/rezultatiAnketaKorisnik'
        this.props.history.push(url)
        this.setState({
            page: e.target.name
        })
    }
    render() {
        let buttonStyle = {
            width: "100%",
            textAlign: "left",
            margin: "0",
            border: "none",
            borderRadius: "0",
            height: "50px"
        }
        return (
            <div class="row" style={{margin: "0", padding: "0", backgroundColor: "#2C3E50", height: "calc(100vh - 80px)"}}>
                <div class="col-3" style={{padding: "0"}}>
                    <ul>
                        <li>
                            <button 
                                type = "button"
                                className = "btn btn-primary"
                                name = "kreirajAnketu"
                                onClick = {this.changePage}
                                style = {buttonStyle}
                            >
                                Kreiraj anketu
                            </button>
                        </li>
                        <li>
                            <button 
                                type = "button"
                                className = "btn btn-primary"
                                name = "popuniAnketu"
                                onClick = {this.changePage}
                                style = {buttonStyle}
                            >
                                Popuni anketu
                            </button>
                        </li>
                        <li>
                            <button 
                                type = "button"
                                className = "btn btn-primary"
                                name = "mojeAnkete"
                                onClick = {this.changePage}
                                style = {buttonStyle}
                            >
                                Moje ankete
                            </button>
                        </li>
                        <li>
                            <button 
                                type = "button"
                                className = "btn btn-primary"
                                name = "javneAnkete"
                                onClick = {this.changePage}
                                style = {buttonStyle}
                            >
                                Javne Ankete
                            </button>
                        </li>
                        <li>
                            <button 
                                type = "button"
                                className = "btn btn-primary"
                                name = "rezultatiAnketa"
                                onClick = {this.changePage}
                                style = {buttonStyle}
                            >
                                Rezultati anketa
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col-9" style={{padding: "0"}}>
                    <Route exact path="/hotel" component={Home} />
                    <Route path="/hotel/kreiranje/" component={Kreiranje} />
                    <Route path="/hotel/popunjavanje/:id" component={Popunjavanje} />
                    <Route path="/hotel/rezultati/:id" component={Rezultati} />
                    <Route path="/hotel/liste" component={Liste} />
                    <Route path="/hotel/uredi/:id" component={Uredi} />
                </div>
            </div>
        )
    }
}