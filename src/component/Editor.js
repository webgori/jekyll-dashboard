import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import Container from "@mui/material/Container";
import MDEditor from '@uiw/react-md-editor';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Editor() {
    const [value, setValue] = React.useState("**Hello world!!!**");

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     window
    //         .fetch(`https://jsonplaceholder.typicode.com/users/1`)
    //         .then((res) => res.json())
    //         .then((user) => {
    //             setUser(user);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, [1]);

    function handleClick() {
        window
            .fetch(`https://jsonplaceholder.typicode.com/users/1`)
            .then((res) => res.json())
            .then((user) => {
                setUser(user);
                setLoading(false);
                alert(user.name);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{minHeight: '100vh'}}>
            <Grid item xs={12} alignItems="center" justifyContent="center">
                <Button onClick={handleClick}>Click Me</Button>
                <p>
                    {!loading && user.id}
                </p>

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
