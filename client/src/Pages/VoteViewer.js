import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '../components/Utils';
import { addProp, getVote, voteForProp } from '../actions/votes.actions';
import QRCode from 'qrcode.react';
import axios from 'axios';

export default function VoteViewer() {
    const dispatch = useDispatch();

    let tab = window.location.pathname.replace();
    var pseudoTab = tab.split("/")[1];

    const [ip, setIp] = useState("");

    useEffect(() => {
        dispatch(getVote(pseudoTab))

        function getIp() {
            axios.get("http://ip-api.com/json").then((data) => {
                setIp(data.data.query);
            })
        }

        getIp()
    }, []);

    const poll = useSelector((state) => state.votesReducer);
    const [isLoading, setIsLoading] = useState(true);
    const [prop, setProp] = useState("");
    const [selectedRadio, setSelectedRadio] = useState();

    const [voteBtn, setVoteBtn] = useState(false);

    const [isVoted, setIsVoted] = useState(true);

    function containsIp(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].ip === obj) {
                return true
            }
        }
        return false;
    }

    useEffect(() => {
        if (!isEmpty(poll)) setIsLoading(false);
        if (selectedRadio) {
            setVoteBtn(true)
        }
        if (isLoading === false) {
            const finish = document.querySelector(".finish.success");
            if (poll.end === true) finish.innerHTML = "Ce sondages est terminées!";
            else finish.innerHTML = " ";
            setIsVoted(containsIp(poll.hasVoted, ip))
        }

    }, [poll, selectedRadio, voteBtn, isLoading, ip]);

    const nodataError = document.querySelector(".nodata.error");

    function containsProp(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].name === obj) {
                nodataError.innerHTML = "Proposition déja inscrit!";
                return true
            }
        }
        return false;
    }


    function handleAddProp() {


        if (!prop) {
            nodataError.innerHTML = "Vous navez entrée aucune proposition!";
        } else {
            if (!poll.choice) {
                dispatch(addProp(pseudoTab, prop))
                window.location.reload();
            } else {

                if (containsProp(poll.choice, prop) === false) {
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

        dispatch(voteForProp(pseudoTab, selectedRadio, ip));
        window.location.reload();
    }

    function cancelVote() {
        setSelectedRadio();
        setVoteBtn(false);
    }
    console.log(isVoted);
    return (
        <>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin" id="loading"></i>
            ) : (
                <div className="voteViewer">
                    <br />
                    <br />
                    <div className="header">
                        <h1>{poll.voteName}</h1>
                        <p>{poll.desc}</p>

                        <div className="qrcode">
                            <h3>Partager le sondage!</h3>

                            <div className="qr">
                                <QRCode value={window.location.href} />
                            </div>
                        </div>

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
                                    if (isVoted === false ) {
                                        if(poll.end === false || !poll.end)  {
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
                                        } else return null
                                    } else {
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
