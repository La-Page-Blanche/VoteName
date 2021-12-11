import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Home() {

    return (
        <div className="home">
            <div className="header">
                <h1>VoteName</h1>
                <h3>Crée un sondage !</h3>
            </div>

            <div className="button">
                <button>
                    <NavLink exact to="/create">
                        Start
                    </NavLink>

                </button>
            </div>
        </div>
    )
}