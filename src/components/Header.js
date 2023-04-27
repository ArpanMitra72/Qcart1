import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  const buttonHandle = (e) =>{
    history.push("/");
  }
  const buttonHandle1 = (e) =>{
    history.push("/login");
  }
  const buttonHandle2 = (e) =>{
    history.push("/register");
  }
  const buttonHandle3 = (e) =>{
    localStorage.clear();
    window.location.reload();
    history.push("/");
  }

    if(hasHiddenAuthButtons){
      return(

        <Box className="header">
          <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            onClick = {buttonHandle}
            variant="text"
          >
            Back to explore
          </Button>
        </Box>    
      )
    }

    return (
      
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        <Stack>
          {localStorage.getItem('username') ? (
            <Stack direction="row" spacing={2} >  
            {/* console.log(localStorage.getItem('token'));         */}
              <Stack direction="row" spacing={1} display="flex" flex-direction="row" align-item="center">
                <Avatar src="avatar.pn" alt={localStorage.getItem('username')}/>
                <p style={{display:"flex",alignItems:"center"}}>{localStorage.getItem('username')}</p>
              </Stack>
              <Button className="explore-button" onClick={buttonHandle3}>
                LOGOUT
              </Button>
            </Stack>
          ) : (
            <Box>
              <Button className="explore-button" onClick={buttonHandle1}>
                LOGIN
              </Button>
              <Button variant="contained" onClick={buttonHandle2}>
                REGISTER
              </Button>
            </Box> 
          ) 
          }
        </Stack>
      </Box>
    );
};
export default Header;
