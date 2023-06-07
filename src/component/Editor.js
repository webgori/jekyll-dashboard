import * as React from 'react';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import MDEditor from '@uiw/react-md-editor';
import axios from "axios";

function Editor() {
    const [value, setValue] = React.useState("**Hello world!!!**");

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");

        if (accessToken != null) {
            return;
        }

        const searchParams = new URLSearchParams(document.location.search)
        let code = searchParams.get("code");

        let clientId = localStorage.getItem("clientId");

        if (code == null) {
            window.location.replace("https://github.com/login/oauth/authorize?client_id=" + clientId + "&scope=repo,user");
            return;
        }

        async function setAccessToken() {
            let accessToken = await getAccessToken(code);

            if (accessToken == null) {
                throw new TypeError("accessToken is null")
            }

            localStorage.setItem("accessToken", accessToken);
        }

        setAccessToken();
    }, []);

    async function getAccessToken(code) {
        let clientId = localStorage.getItem("clientId");
        let clientSecret = localStorage.getItem("clientSecret");

        let response = await axios.post('/oauth/github/access-token', JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response.data["accessToken"];
    }

    async function getRepositories(code) {
        let accessToken = localStorage.getItem("accessToken", accessToken);

        /*let response = await axios.post('/oauth/github/access-token', JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response.data["accessToken"];*/
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
