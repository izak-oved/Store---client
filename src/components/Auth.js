import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useNavigate } from 'react-router-dom';
const Auth = ({setUser}) => {
    const navigate = useNavigate()

    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
    }
    const resetState = () => {
        setIsSignup(!isSignup)
        setInputs({ name: "", email: "", password: "" })
    }
    //..............................................................
    const submitData = () => {
        console.log("cdsac");
        if (isSignup) {
            fetch('http://localhost:4000/api/user', {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => console.log(data))
        } else {
            fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    if (data) {
                        navigate("/")
                        setUser(data[0])
                    }
                })



        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    boxShadow={'5px 5px 10px #ccc'}
                    sx={{
                        ":hover": {
                            boxShadow: '10px 10px 20px #ccc',
                        }
                    }}
                >"
                    <Typography
                        variant="h3"
                        padding={3}
                        textAlign="center"
                    >
                        {isSignup ? "Signup" : "Login"}
                    </Typography>
                    {isSignup && <TextField
                        onChange={handleChange}
                        value={inputs.name}
                        name="name"
                        label="name"
                        margin="normal"
                        type={"text"}
                        variant="outlined"
                        placeholder='FullName'
                    />
                    }
                    <br />
                    <TextField
                        onChange={handleChange}
                        value={inputs.email}
                        name="email"
                        label="email"
                        margin="normal"
                        type={"email"}
                        variant="outlined"
                        placeholder='Email'
                    />
                    <br />
                    <TextField
                        onChange={handleChange}
                        value={inputs.password}
                        name="password"
                        label="password"
                        margin="normal"
                        type={"password"}
                        variant="outlined"
                        placeholder='Password'
                    />
                    <Button
                        onClick={submitData}
                        endIcon={isSignup ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />}
                        type="submit"
                        sx={{ marginTop: 3, borderRadius: 3 }}
                        variant="contained"
                        color="error"

                    >
                        {isSignup ? "Signup" : "Login"}
                    </Button>
                    <Button
                        endIcon={
                            isSignup ? <LoginOutlinedIcon /> : <HowToRegOutlinedIcon />
                        }
                        onClick={resetState}
                        sx={{ marginTop: 3, borderRadius: 3 }}

                    >
                        change to {isSignup ? "Login" : "Signup"}
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default Auth