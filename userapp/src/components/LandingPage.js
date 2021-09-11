import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import {
    TextField,
    Button
} from '@material-ui/core'
const LandingPage = () => {
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');

    const submit = (event) => {
        //TODO change 
        fetch('http://DOMAINTOCHANGE/finduser',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "user_name": userName,
                "password": password
            })
        }).then(function(response){
            if(response.ok){
                response.json().then(data => )
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