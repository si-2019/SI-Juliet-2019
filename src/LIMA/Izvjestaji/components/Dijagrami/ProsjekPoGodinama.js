import React, { Fragment, Component } from 'react';
import { Line } from 'react-chartjs-2';
import GrafikStavka from './GrafikStavka.js';

import { student } from '../../api.js';
import { Spinner } from 'reactstrap';

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [],
    },
}

class ProsjekPoGodinama extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        let studentId = 3;
        let niz = [
            {naziv: "2016/2017", godinaId: 12, prosjek: 7.6},
            {naziv: "2017/2018", godinaId: 13, prosjek: 7.2},
            {naziv: "2018/2019", godinaId: 14, prosjek: 7.8}
        ];

        student.getProsjeci(studentId).then( data => {
            let dataForState = {
                labels: [],
                datasets: [{
                    label: "Prosjek po godinama",
                    backgroundColor: 'rgba(15,145,20,0.2)',
                    borderColor: 'rgba(15,145,20,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,252,82,0.4)',
                    hoverBorderColor: 'rgba(75,252,82,1)',
                    data: []
                }]
            };
            for(let i=0;i<data.length;i++){
                dataForState.labels.push(data[i].naziv);
                dataForState.datasets[0].data.push(data[i].prosjek);
            }
            this.setState({
                data: dataForState
            });
        })
    }
    render(){
        return (this.state.data ? 
            <div className="w-100  d-flex justify-content-center" style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                    height: '250px'
                }} >
                <Line
                    data={this.state.data}
                    options={options}
                />
            </div> :
            <Spinner />)
    }
}

export default ProsjekPoGodinama;