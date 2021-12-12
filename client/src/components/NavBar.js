import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="https://www.zupimages.net/up/21/49/jozg.jpg" alt="icon" />
                            <h3>VoteName</h3>
                        </div>
                    </NavLink>
                </div>


                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName="nav-activ">
                            <i className="fas fa-home"></i>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;