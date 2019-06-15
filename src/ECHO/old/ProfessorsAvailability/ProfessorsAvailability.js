import React, {Component, Fragment} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from 'rc-pagination'
import localeInfo from 'rc-pagination/lib/locale/en_US';
import './ProfessorsAvailability.css';
import 'rc-pagination/assets/index.css';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProfessorsAvailability extends Component {
    constructor(props){
        super(props);
        this.state={
            professorsList: [],
            page: 1,
            size: 10,
            total: 0,
            input: '',
        }
    }
    onChangeHandler(e){
        this.setState({
            input: e.target.value,
            page: 1,
        });
        this.componentDidMount();
    }
    onChange(current, pageSize){
        this.setState({
           page: current,
        }, this.componentDidMount)
    }
    static onStaffEdit(e){
        console.log(e.target.value);
    }
    componentDidMount() {
        fetch("http://localhost:31905/si2019/echo/getTeachingStaff", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'page': this.state.page-1,
                'size': this.state.size,
                'search': this.state.input,
            })
        })
            .then(res => {return res.json()})
            .then(
                (result) => {
                    this.setState({
                        professorsList: result.content,
                        total: result.totalElements,

                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        var professors = this.state.professorsList
            .map((prof) => {
            return(
                <Fragment key={prof.id}>
                    <tr>
                        <td>{prof.ime} {prof.prezime}</td>
                        <td>{prof.email}</td>
                        <td>{prof.titula}</td>
                        <td><a onClick={ProfessorsAvailability.onStaffEdit.bind(prof)}><EditIcon/></a></td>
                    </tr>
                </Fragment>
            )
        });
        return (
            <div className="container">
                <div className="row search-teachers shadow-border">
                    <input id="searchTeachingStaff" type="text" placeholder="Search.." onChange={this.onChangeHandler.bind(this)}/>

                </div>
                <div className="row">
                    <table id="teachingStaffTable" className="table table-bordered table-hover professors-table shadow-border">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {professors}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    id="pagination" className="pagination-table"
                    current={this.state.page}
                    total={this.state.total}
                    pageSize={this.state.size}
                    showPrevNextJumpers
                    locale={localeInfo}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}

export default ProfessorsAvailability;
