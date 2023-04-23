import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [success,setSuccess] = useState(false);
  // const [userBalance,setUserBalance] = useState(0);
  // const [loggesin, setLoggedIn] = useState(0);
  const history = useHistory();

  const buttonHandle = (e) =>{
    const formData = {
      UserName: username,
      Password: password,
    };
    setSuccess(true);
    login(formData); 
  }
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    if(validateInput(formData)===true){
      try{
        const url = `${config.endpoint}/auth/login`;
        let response = await axios.post(url,{
          username:formData.UserName,
          password:formData.Password
        })
        setSuccess(false);
        // setUserName("");
        // setPassword("");
        enqueueSnackbar("Logged in successfully",{variant:"success"});   
        persistLogin(response.data.token,response.data.username,response.data.balance);
        history.push("/");
      }catch(error){
        if(error.response.status===400){
          enqueueSnackbar(error.response.data.message,{variant:"error"});
          setSuccess(false);
        }else{
          // console.log(error);
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
          setSuccess(false);
        }
      } 
    }else{
      setSuccess(false);
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    // return true;
    if(data.UserName!=="" && data.Password!==""){
      return true;
    }else if(data.UserName!=="" && data.Password ===""){
      enqueueSnackbar("Password is a required field",{variant:"warning"});
      return false;
    }else if(data.UserName ==="" && data.Password !==""){
      enqueueSnackbar("Username is a required field",{variant:"warning"});
      return false;
    }else{
      return false;
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    // const userData = {
    //   token:token,
    //   username:username,
    //   balance:balance
    // }
    localStorage.setItem('token',(token));
    localStorage.setItem('username',(username));
    localStorage.setItem('balance',(balance));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange = {(e)=>setUserName(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
           {success===true && (
            <Box display="flex"
            justifyContent="center"
            alignltems="center">
              <CircularProgress size={25} color="primary"/>
            </Box>
            
          )}
          {success===false && (
            <Button className="button" variant="contained" type="submit" onClick={buttonHandle}>
              LOGIN TO QKART
           </Button>
          )}
          <p className="secondary-action">
            Don’t have an account?{" "}
             <a className="link" href="/register">
              Register now
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
