import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateVote() {
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [choice, setChoice] = useState();

    function handleCreate(e) {
        e.preventDefault();
        const nodataError = document.querySelector(".nodata.error");

        if(!name || !desc) return nodataError.innerHTML = "Certaines informations sont invalides ou incomplêtes";
        else {
            
            const data = {
                "name": name,
                "desc": desc,
                "choice": choice
            }

            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/vote/`,
                withCredentials: true,
                data: data,
            })
                .then((res) => {
                    console.log(res.data);
                    window.location = `/${res.data._id}`;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="create-vote">
            <form onSubmit={handleCreate}>
                <h1>Crée un sondage</h1>
                <label>Nom du sondage</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="La Page Blanche"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <label>Description</label>
                <textarea
                    id="desc"
                    name="desc"
                    rows="3"
                    cols="33"
                    placeholder="Journal ....."
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                                    />
                <label>Choix par defaut</label>
                <input
                    type="text"
                    name="choice"
                    id="choice"
                    placeholder="LaGuardia LGA"
                    onChange={(e) => setChoice(e.target.value)}
                    value={choice}
                />
                <br />
                <div className="nodata error"></div>
                <br />
                <input type="submit" />
                <br />
            </form>
        </div>
    )
}
