import React from 'react';
// import ReactDOM from 'react-dom'
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Checkout from "./components/Checkout"; 
import Thanks from "./components/Thanks";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Products />
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route> 
              <Route path="/Thanks">
                <Thanks/>
              </Route>
            </Switch>  
          </div>
        </ThemeProvider>
      </React.StrictMode>
    </div>
       
  );
}
export default App;
