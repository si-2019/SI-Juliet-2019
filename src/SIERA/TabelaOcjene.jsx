import React from "react";
import "./tabela.css"

class TabelaOcjene extends React.Component {

    render() {
        return (
            <div className="col-sm-12 col-xs-12 col-md-12 col-lg-4">
                <table className="table table-bordered text-center bg-active border-solid" style={{  float: "left", marginLeft: "20px" }}>
                    <tbody>
                        <tr class="bg-primary text-light">
                            <th class="tabtip" scope="row" colSpan="2">Akademska godina {this.props.akGod}</th>
                        </tr>
                        <tr class="bg-primary text-light">
                            <th class="tabtip">Predmet</th>
                            <th class="tabtip">Ocjena</th>
                        </tr>
                        {this.props.ocj.map(x =>
                            <tr class="tabtip1">
                                <td>{x.Predmet}</td>
                                <td>{x.Ocjena}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default TabelaOcjene;