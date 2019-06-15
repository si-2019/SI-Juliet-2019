import React from 'react'
import './liste/stil.css'
import DatePicker from 'react-datepicker'
import url from './url'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idAnketa: props.match.params.id,
            datumIstekaAnkete: new Date()
        }
        this.handleDateChange = this.handleDateChange.bind(this)
        this.promijeni = this.promijeni.bind(this)
    }
    
    promijeni() {
       fetch(url + '/promijeniDatumIsteka', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                datumIstekaAnkete: this.state.datumIstekaAnkete,
                idAnketa: this.state.idAnketa
            })  
        }).then((res, err) => {
            if(res.error) {
                this.setState({
                    error: res.error
                })
            }
        })
    }

    render() {
        return (
            <div className="okvirListe">
                <div className="naslovliste">
                    <h1>Promijeni datum isteka</h1>
                </div>
                <div id="urediBody">
                    <h5>Datum isteka ankete:</h5>
                    <div>  
                        <DatePicker
                                onChange={this.handleDateChange} 
                                selected={this.state.datumIstekaAnkete} 
                                showTimeSelect
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                timeCaption="time"
                                />
                    </div>
                    <button className="btn btn-primary" onClick={this.promijeni} style={{
                        width: "30%",
                        marginTop: "10px"
                    }}>
                        Promijeni
                    </button>
                 </div>
            </div>
        )
    }

    handleDateChange(date) {
        this.setState({
            datumIstekaAnkete: date,
            dateChanged: true
        });
    }
    
    componentDidMount() {
        fetch(url + '/dajOsnovno?idAnketa=' + this.state.idAnketa).then(res => res.json()).then(
            res => {
                this.setState({
                    anketa: res.anketa,
                    datumIstekaAnkete: new Date(Date.parse(res.anketa.datumIstekaAnkete))
                })
                console.log(res)
            }
        )
    }

}