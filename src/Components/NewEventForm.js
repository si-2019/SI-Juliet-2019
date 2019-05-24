import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export class NewEventForm extends Component {
    constructor(){
        super()
        this.state={
            eventName:'',
            startDate:new Date(),
            diffTime:null,
            endDate:new Date()
        }
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeStart=this.handleChangeStart.bind(this);
        this.handleChangeEnd=this.handleChangeEnd.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChangeName(e){
      this.setState({ eventName:e.target.value})
    }
    handleChangeStart(startDate){
      this.setState({ startDate:startDate})
    }
    handleChangeEnd(endDate){
      this.setState({
        endDate:endDate,
        diffTime:Math.abs(this.state.startDate.getTime() - endDate.getTime())})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.addEvent(this.state.eventName, this.state.startDate, this.state.endDate);
        this.setState({eventName:'NewEvent...'})
    }
  render() {
    return (
      <div className="new-event-form" style={{margin: '1%',backgroundColor:'#7856AD'}}>
        <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChangeName} type='text' placeholder='New event...' value={this.state.eventName} />
            <p>Event start</p>
            <DatePicker
                selected={this.state.startDate}
                timeInputLabel="Time:"
                showTimeInput
                dateFormat="dd/mm/yyyy hh:mm aa"
                timeFormat="hh:mm aa"
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
            />
            <p>Event end</p>
             <DatePicker
              selected={this.state.endDate}
              timeInputLabel="Time:"
              showTimeInput
              dateFormat="dd/mm/yyyy hh:mm aa"
              timeFormat="hh:mm aa"
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
          />
            <button id='create-event-btn' type="submit">+</button>
        </form>
      </div>
    )
  }
}
export default NewEventForm