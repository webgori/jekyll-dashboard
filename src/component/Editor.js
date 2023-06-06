import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import MDEditor from '@uiw/react-md-editor';
import axios from "axios";

function Editor() {
    const [value, setValue] = React.useState("**Hello world!!!**");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");

        if (accessToken != null) {
            return;
        }

        const searchParams = new URLSearchParams(document.location.search)
        let code = searchParams.get("code");

        console.log(accessToken);

        let clientId = localStorage.getItem("clientId");

        if (code == null) {
            window.location.replace("https://github.com/login/oauth/authorize?client_id=" + clientId + "&scope=repo,user");
        }

        console.log("aa")
        getAccessToken(code)

        if (accessToken == null) {
            throw new TypeError("accessToken is null")
        }

        localStorage.setItem("accessToken", accessToken);
    });

    async function getAccessToken(code) {
        let clientId = localStorage.getItem("clientId");
        let clientSecret = localStorage.getItem("clientSecret");

        /*const aa = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: code
                }
            });*/

        /*const response = await fetch(`https://github.com/login/oauth/access_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code
            })
        });

        console.log(response);*/

        const axiosResponse = await axios.post('http://localhost:8000/oauth/github/access-token', JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        console.log(axiosResponse);
    }

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{minHeight: '100vh'}}>
            <Grid item xs={12} alignItems="center" justifyContent="center">
                <MDEditor
                    value={value}
                    onChange={setValue}
                    height={500}
                />
            </Grid>
        </Grid>
    );
}

export default Editor;
