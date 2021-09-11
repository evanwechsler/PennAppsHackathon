import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import {
    TextField,
    Button
} from '@material-ui/core'
import * as ROUTES from '../routes';
function LandingPage(props){
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');

    const submit = (event) => {
        event.preventDefault();
        //TODO change 
        fetch('http://localhost:8080/login',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "user_name": userName,
                "password": password
            })
        }).then(function(response){
            if(response.ok){
                //If there's a record of the user in the database,
                //set the data from the response and push to
                //records page
                response.json().then(data => {
                    props.setRecords(data);
                    props.history.push(ROUTES.RECORDS);
                })
            }
        } )
    }
    return (
        <Box p={5} border={1} width = {1/4} display = "flex" justifyContent="center" flexDirection="column">
            <h1>Enter Information</h1>
            <TextField label="Name" variant='outlined' onChange = {e => setName(e.target.value)}></TextField>
            <br/>
            <TextField label="password" variant ='outlined' onChange = {e => setPassword(e.target.value)}></TextField>
            <br/>
            <Button variant='contained' color='primary' onClick={submit}>Submit</Button>
        </Box>

    )
}

export default LandingPage;