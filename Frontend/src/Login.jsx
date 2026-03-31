import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Login() {

    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    }); 

    function handleChange(e) {
        const {name, value} = e.target;
        setLoginData((prev)=>({...prev,
            [name]:value
        }))
    }
    console.log(loginData);

  return (
    <div className="loginWrapper">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "30%",
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 3px 3px #f1f1f1",
          padding: "40px",
          borderRadius: "20px"
        }}
      >
        <h1>Login</h1>
        <TextField
          id="outlined-textarea"
          label="User Name"
          placeholder="User Name"
          name="email"
          onChange={handleChange}
        />

        <TextField
          id="outlined-textarea"
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" size="large">
          Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;
