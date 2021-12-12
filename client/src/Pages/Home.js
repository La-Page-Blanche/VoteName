import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '../components/Utils';
import { endPoll } from '../actions/votes.actions';

export default function Home() {
    const polls = useSelector((state) => state.allVotesReducer);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    for (let i = 0; i < polls.length; i++) {
        if (polls[i].endDate < Date.now()) {
            dispatch(endPoll(polls[i]._id, true))
        }
    }

    useEffect(() => {
        if (!isEmpty(polls)) setIsLoading(false)
    }, [polls]);

    return (
        <>
            {isLoading ? (
                <div className="home">
                    <br />
                    <br />
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
            ) : (
                <div className="home">
                    <br />
                    <br />
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

                    <div className="allPoll">
                        <h1 className="h1">All polls</h1>
                        <ul>
                            {
                                polls.map((p) => {
                                    return (

                                        <li key={p._id}>
                                            <a href={"/" + p._id}>
                                                <h1>{p.voteName}</h1>
                                                <p>{p.desc}</p>
                                                <br />
                                                <a href={"/" + p._id}>
                                                    <button>Voire</button>
                                                </a>
                                                <br />
                                            </a>
                                        </li>

                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
            }
        </>
    )
}