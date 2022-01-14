import React ,{ useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import './NavLinks.css';

const NavLinks = props => {

    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>All Users</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to={`/${auth.userId}/places`}>My places</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/places/new">Add place</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to="/auth">Login/Signup</NavLink>
        </li>}
        {
          auth.isLoggedIn && (<li>
              <button onClick={auth.logout}>LOGOUT</button>
          </li>)
        }
    </ul>
};

export default NavLinks;
