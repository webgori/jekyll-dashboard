import * as React from 'react';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from "react-router-dom";

function Editor() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken == null) {
            navigate('/');
        }
    }, [navigate]);

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
