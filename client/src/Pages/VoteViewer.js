import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '../components/Utils';
import { addProp, getVote, voteForProp } from '../actions/votes.actions'

export default function VoteViewer() {
    const dispatch = useDispatch();

    let tab = window.location.pathname.replace();
    var pseudoTab = tab.split("/")[1];

    useEffect(() => {
        dispatch(getVote(pseudoTab))
    }, []);

    const poll = useSelector((state) => state.votesReducer);
    const [isLoading, setIsLoading] = useState(true);
    const [prop, setProp] = useState("");
    const [selectedRadio, setSelectedRadio] = useState();

    const [voteBtn, setVoteBtn] = useState(false);

    useEffect(() => {
        if (!isEmpty(poll)) setIsLoading(false);
        if (selectedRadio) {
            setVoteBtn(true)
        }
        if (isLoading === false) {
            const finish = document.querySelector(".finish.success");
            if (poll.end === true) finish.innerHTML = "Ce sondages est terminées!";
            else finish.innerHTML = " ";
        }

    }, [poll, selectedRadio, voteBtn, isLoading]);


    function handleAddProp() {
        const nodataError = document.querySelector(".nodata.error");

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i].name === obj) {
                    nodataError.innerHTML = "Proposition déja inscrit!";
                    return true
                }
            }
            return false;
        }

        if (!prop) {
            nodataError.innerHTML = "Vous navez entrée aucune proposition!";
        } else {
            if (!poll.choice) {
                dispatch(addProp(pseudoTab, prop))
                window.location.reload();
            } else {

                if (contains(poll.choice, prop) === false) {
                    dispatch(addProp(pseudoTab, prop))
                    window.location.reload();
                }
            }
        }
    }

    function handleRadio(event) {
        let radio = event.target.value
        setSelectedRadio(radio)
    }

    function handleVote() {
        dispatch(voteForProp(pseudoTab, selectedRadio));
        window.location.reload();
    }

    function cancelVote() {
        setSelectedRadio();
        setVoteBtn(false);
    }

    return (
        <>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin" id="loading"></i>
            ) : (
                <div className="voteViewer">
                    <div className="header">
                        <h1>{poll.voteName}</h1>
                        <p>{poll.desc}</p>
                    </div>

                    <div className="contents">
                        <label>Ajouter une proposition</label>
                        <input
                            placeholder="proposition"
                            type="text"
                            name="prop"
                            id="prop"
                            onChange={(e) => setProp(e.target.value)}
                            value={prop}
                        />
                        <button onClick={handleAddProp}>Crée</button>
                        <div className="nodata error"></div>
                        <div className="finish success"></div>

                        <ul>
                            {
                                poll.choice.map((c) => {
                                    if (poll.end === false || !poll.end) {
                                        return (
                                            <li key={c._id}>
                                                <h1>{c.voteCount}</h1>
                                                <h3>{c.name}</h3>
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    checked={c._id === selectedRadio}
                                                    value={c._id}
                                                    id={c._id}
                                                    onChange={handleRadio}
                                                />
                                            </li>
                                        )
                                    }

                                    if (poll.end === true) {
                                        return (
                                            <li key={c._id}>
                                                <h1>{c.voteCount}</h1>
                                                <h3>{c.name}</h3>
                                            </li>
                                        )
                                    }

                                })
                            }
                        </ul>

                        {
                            voteBtn && (
                                <div className="voteChoice">
                                    <button onClick={cancelVote}>Abandonner le vote</button>
                                    <button onClick={handleVote}>Voter</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
            }
        </>
    );
}
