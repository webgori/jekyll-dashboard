import * as React from 'react';
import {useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Authentication() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await setAccessToken();

            const accessToken = localStorage.getItem("accessToken");
            if (accessToken !== null) {
                navigate('/posts');
            }
        })();

        async function setAccessToken() {
            const accessToken = localStorage.getItem("accessToken");
    
            if (accessToken != null) {
                return;
            }
            
            const code = getQueryParam("code");
    
            if (code == null) {
                const clientId = localStorage.getItem("clientId");
    
                window.location.replace("https://github.com/login/oauth/authorize?client_id=" + clientId + "&scope=repo,user");
                return;
            }
    
            setAccessTokenToLocalStorage();

            async function setAccessTokenToLocalStorage() {
                const code = getQueryParam("code");
                const accessToken = await callApi(code);
        
                if (accessToken == null) {
                    throw new TypeError("accessToken is null")
                }
        
                localStorage.setItem("accessToken", accessToken);
            }
        }
    }, [navigate]);

    function getQueryParam(name) {
        return new URLSearchParams(document.location.search).get(name);
    }

    async function callApi(code) {
        const clientId = localStorage.getItem("clientId");
        const clientSecret = localStorage.getItem("clientSecret");

        const response = await axios.post('/oauth/access-token', JSON.stringify({
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

    return (
        <div />
    );
}

export default Authentication;
