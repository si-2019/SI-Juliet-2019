import React, { Component } from 'react';
import NewEventForm from './NewEventForm';
import Axios from 'axios';

class EventPlanner extends Component {
    constructor(props){
        super(props);

        this.state = {
            events: [],
            
            showForm:false,
            ulaz:new Date(),
            traje:null
        }
        this.addEvent = this.addEvent.bind(this);
        this.getEvents=this.getEvents.bind(this);
        this.isToday=this.isToday.bind(this);
    }
    showEventForm(){
        this.setState({
            showForm:true
        })
    }
    componentWillMount(){
        this.setState({
            events: [],
            ulaz: Date.now()
        });
        this.getEvents();
        
    }
    getEvents(){
        Axios.get('http://localhost:31910/events')
        .then(res => {
            this.setState({
                events: res.data
            });
        })
        .catch(err => console.log(err));
    }
    addEvent = (ime,pocinje,kraj)=>{
        Axios.post(`http://localhost:31910/event` , {
            kreirao:this.props.currentId,
            naziv:ime,
            pocetak:pocinje,
            kraj:kraj
        })
        .then(res => {
            this.setState({ events: [] });
            this.getEvents();
        }).catch(err => {
            console.error(err);
            alert(err)
        });
    }
    isToday(event){
        
        if( ((Date.parse(event.pocetak)<=(86400000+this.state.ulaz))||(Date.parse(event.kraj)<=(86400000+this.state.ulaz))) && Date.parse(event.kraj)>=this.state.ulaz) return true;
        return false
    }
    didPass(event){
        if( (Date.parse(event.kraj)<this.state.ulaz)) return true;
        return false
    }
    
    render(){
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }
          let todaysEvents=[];
          let otherEvents=[];
          if (this.state.events){todaysEvents = this.state.events.filter(event=>this.isToday(event));
          otherEvents = this.state.events.filter(event=>!this.isToday(event) && !this.didPass(event));}
        return(
            <div>
                <h3 style={{marginTop: '1rem', marginBottom: '1rem'}}>Event Planner</h3>
                <ul style={{maxHeight: '300px', overflowY: 'scroll'}}>
                    <h5>Događaji u sljedeća 24h</h5>
                    {todaysEvents ? 
                    todaysEvents.map((event, index) => {
                        
                        return <li className={"event" } key={index}>{ event.naziv+ ' @ '+new Intl.DateTimeFormat('it-IT',options).format(new Date( Date.parse(event.pocetak)))} </li>
                    })
                        :
                        null  } 
                        <h5>Ostali događaji</h5>
                        {otherEvents ? 
                        otherEvents.map((event, index) => (
                            <li className={"event" } key={index}>{ event.naziv+ ' @ '+new Intl.DateTimeFormat('it-IT',options).format(new Date( Date.parse(event.pocetak)))} </li>
                                ))
                            :
                            null  }           
                         
                </ul>
                <button id='create-event-btn' onClick={()=>this.showEventForm()}>New Event</button>
                {
                    this.state.showForm?
                    <NewEventForm addEvent={this.addEvent}/>
                    :null
                }
            </div>
        )
    }
}

export default EventPlanner;