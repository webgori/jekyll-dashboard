import * as React from 'react';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import MDEditor from '@uiw/react-md-editor';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Posts() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken == null) {
            navigate('/');
        }

        (async () => {
            const userRepository = await getUserRepository();
            console.log(userRepository);
            getUserRepositoryFiles(userRepository);
        })();
    }, [navigate]);

    async function getUserRepository() {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get('/user/repo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data;
    }

    async function getUserRepositoryFiles(userRepository) {
        const accessToken = localStorage.getItem("accessToken");
        const owner = userRepository["owner"]["login"];
        const repo = userRepository["name"];
        const path = '/_posts';

        const response = await axios.get(`/files`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                owner: owner,
                repo: repo,
                path: path
            },
        });

        console.log(response.data);

        return response.data["accessToken"];
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

export default Posts;
