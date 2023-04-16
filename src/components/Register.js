import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

// console.log(config);
const Register = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });
   
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [success,setSuccess] = useState(false);
  const buttonHandle = (e) =>{
    const formData = {
      UserName: username,
      Password: password,
      ConfirmPassword: confirmPassword 
    };
    console.log(formData);
    if(validateInput(formData)===true){
      setSuccess(true);
      register(formData);
    }
  }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    
    // const url = `${config.endpoint}/auth/register`;
    // axios.post(url,{
    //   username:formData.username,
    //   password:formData.password
    // })
    // .then((res)=>{
    //   console.log(res);
    //   setSuccess(true);
    // })
    // .catch((err)=>{
    //   console.log(err);
    //   setSuccess(false);
    // })
    console.log(formData);
    try{
      const url = `${config.endpoint}/auth/register`;
      let response = await axios.post(url,{
        username:formData.UserName,
        password:formData.Password
      })
      setSuccess(false);
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      console.log(response);
      enqueueSnackbar("Registered successfully",{variant:"success"});
    } catch(error){
      if(error.response.status===400){
       enqueueSnackbar(error.response.data.message,{variant:"error"});
       setSuccess(false);
      }else{
        console.log(error);
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
        setSuccess(false);
      }
      
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    console.log(data);
    if(data.UserName===""){
      enqueueSnackbar("Username is a required field",{variant:"warning"});
      return false;
    }
    else if(data.UserName.length<6){
      enqueueSnackbar("Username must be at least 6 characters",{variant:"warning"});
      return false;
    }
    else if(data.Password===""){
      enqueueSnackbar("Password is a required field",{variant:"warning"});
      return false;
    }
    else if(data.Password.length<6){
      enqueueSnackbar("Password must be at least 6 characters",{variant:"warning"});
      return false;
    }
    else if(data.Password!==data.ConfirmPassword){
      enqueueSnackbar("Passwords do not match",{variant:"warning"});
      return false;
    }
    else{
      return true;
    }
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
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
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
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange = {(e)=>setConfirmPassword(e.target.value)}
            fullWidth
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
            Register Now
           </Button>
          )} 
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};
export default Register;

// import { Button, CircularProgress, Stack, TextField } from "@mui/material";
// import { useHistory,Link } from "react-router-dom";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import React, { useState } from "react";
// import { config } from "../App";
// import Footer from "./Footer";
// import Header from "./Header";
// import "./Register.css";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const history = useHistory();
//   const { enqueueSnackbar } = useSnackbar();
//   const [loading, setLoading] = useState(false);

//   const handleInput = (e) => {
//     setFormData((prevValue) => ({
//       ...prevValue,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
//   /**
//    * Definition for register handler
//    * - Function to be called when the user clicks on the register button or submits the register form
//    *
//    * @param {{ username: string, password: string, confirmPassword: string }} formData
//    *
//    *  Object with values of username, password and confirm password user entered to register
//    *
//    * API endpoint - "POST /auth/register"
//    *
//    * Example for successful response from backend for the API call:
//    * HTTP 201
//    * {
//    *      "success": true,
//    * }
//    *
//    * Example for failed response from backend for the API call:
//    * HTTP 400
//    * {
//    *      "success": false,
//    *      "message": "Username is already taken"
//    * }
//    */
//   // register(formData);
//   const register = async (formData) => {
//     if (!validateInput(formData)) return;
//     //this means flase condition only execute when your have false values null or 0 makes sense 
//     // cause only then we want to retun and not on true conditions 


//     console.log(formData);
//     try {
//       setLoading(true);
//       await axios.post(`${config.endpoint}/auth/register`, {
//         username: formData.username,
//         password: formData.password,
//       });
//       setLoading(false);
//       setFormData({
//         username: "",
//         password: "",
//         confirmPassword: "",
//       });
//       history.push("/login");
//       enqueueSnackbar("Registered Successfully", { variant: "success" });
//     } catch (e) {
//       setLoading(false);
//       enqueueSnackbar(e.response.data.message, { variant: "error" });
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
//   /**
//    * Validate the input values so that any bad or illegal values are not passed to the backend.
//    *
//    * @param {{ username: string, password: string, confirmPassword: string }} data
//    *  Object with values of username, password and confirm password user entered to register
//    *
//    * @returns {boolean}
//    *    Whether validation has passed or not
//    *
//    * Return false if any validation condition fails, otherwise return true.
//    * (NOTE: The error messages to be shown for each of these cases, are given with them)
//    * -    Check that username field is not an empty value - "Username is a required field"
//    * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
//    * -    Check that password field is not an empty value - "Password is a required field"
//    * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
//    * -    Check that confirmPassword field has the same value as password field - Passwords do not match
//    */
//   const validateInput = (data) => {
//     if (!data.username) {
//       enqueueSnackbar("Username is a required filed", { variant: "warning" });
//       return false;
//     }
//     if (data.username.length < 6) {
//       enqueueSnackbar("Username must be at least 6 characters", {
//         variant: "warning",
//       });
//       return false;
//     }
//     if (!data.password) {
//       enqueueSnackbar("Password is a required filed", { variant: "warning" });
//       return false;
//     }
//     if (data.password.length < 6) {
//       enqueueSnackbar("Password must be at least 6 characters", {
//         variant: "warning",
//       });
//       return false;
//     }
//     if (data.password !== data.confirmPassword) {
//       enqueueSnackbar("Passwords do not match", { variant: "warning" });
//       return false;
//     }
//     return true;
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="space-between"
//       minHeight="100vh"
//     >
//       <Header hasHiddenAuthButtons />
//       <Box className="content">
//         <Stack spacing={2} className="form">
//           <h2 className="title">Register</h2>
//           <TextField
//             id="username"
//             label="Username"
//             variant="outlined"
//             title="Username"
//             name="username"
//             placeholder="Enter Username"
//             fullWidth
//             value={formData.username}
//             onChange={handleInput}
//           />
//           <TextField
//             id="password"
//             variant="outlined"
//             label="Password"
//             name="password"
//             type="password"
//             helperText="Password must be atleast 6 characters length"
//             fullWidth
//             value={formData.password}
//             placeholder="Enter a password with minimum 6 characters"
//             onChange={handleInput}
//           />
//           <TextField
//             id="confirmPassword"
//             variant="outlined"
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             fullWidth
//             value={formData.confirmPassword}
//             onChange={handleInput}
//           />
//           {loading ? (
//             <Box display="flex" justifyContent="center" alignItems="center">
//               <CircularProgress size={25} color="primary" />
//             </Box>
//           ) : (
//             <Button
//               className="button"
//               variant="contained"
//               onClick={() => register(formData)}
//             >
//               Register Now
//             </Button>
//           )}
//           <p className="secondary-action">
//             Already have an account?{" "}
//             {/* <a className="link" href="#">
//               Login here
//             </a> */}
//             <Link className="link" to={"/login"} >Login Now</Link>
//           </p>
//         </Stack>
//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default Register;

