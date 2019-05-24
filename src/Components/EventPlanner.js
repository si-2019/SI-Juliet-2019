import React, { Component } from 'react';
import NewEventForm from './NewEventForm';
import Axios from 'axios';
import '../styles/EventPlanner.css';
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
        setInterval(function(){
            this.setState({
                ulaz: Date.now()
            });
        }.bind(this), 60000);
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
    isNow(event){
        if( (Date.parse(event.kraj)>=this.state.ulaz) && (Date.parse(event.pocetak)<=this.state.ulaz)  ) return true;
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
            <div className="planer">
                <h3 style={{marginTop: '1rem', marginBottom: '1rem'}}>Event Planner</h3>
                <ul style={{maxHeight: '300px', overflowY: 'scroll'}}>
                    <h4>Next 24hrs</h4>
                    {todaysEvents ? 
                    todaysEvents.map((event, index) => {
                        const active = this.isNow(event)===true ?'active':'';
                        const activeText = this.isNow(event)===true ?' ACTIVE!':'';
                        return <li className={"event"+active } key={index}>{ event.naziv+ ' @ '+new Intl.DateTimeFormat('it-IT',options).format(new Date( Date.parse(event.pocetak)))+activeText} </li>
                    })
                        :
                        null  } 
                        <h4>Later events</h4>
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