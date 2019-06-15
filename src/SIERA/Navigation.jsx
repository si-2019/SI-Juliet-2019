import React from "react";
import { NavLink } from 'react-router-dom';


const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div >
                <NavLink to="/Siera" className="col-sm-2">Početna</NavLink>
                <NavLink to="/Siera/podaci-o-studentu" className="col-sm-2">Profil</NavLink>
                <NavLink to="/Siera/lista-predmeta" className="col-sm-2">Lista predmeta</NavLink>
                <NavLink to="/Siera/ugovor-o-ucenju" className="col-sm-2">Ugovor o učenju</NavLink>
                <NavLink to="/Siera/zavrsni-rad" className="col-sm-2">Završni rad</NavLink>
                <NavLink to="/Siera/ocjene" className="col-sm-2">Ocjene</NavLink>
            </div>
        </nav>
    );
};

export default Navigation;