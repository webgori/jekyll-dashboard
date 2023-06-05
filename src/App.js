import * as React from 'react';
import Container from "@mui/material/Container";
import Editor from "./component/Editor";

function App() {
    let clientId = localStorage.getItem("clientId");
    let clientSecret = localStorage.getItem("clientSecret");

    return (
        <div className="App">
            <Container>
                {clientId != null && clientSecret != null ? <Editor/> : <h2><center>NOT FOUND CLIENT INFO</center></h2>}
            </Container>
        </div>
    );
}

export default App;
