import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import LockRound from "@mui/material/Icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
} from "@mui/material";
import "../App.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { async } from "@firebase/util";

function Login(props) {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [type, setType] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheck = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      console.log(uid);
      const q = query(collection(db, "Employee"), where("email", "==", email));
      const docs = await getDocs(q);
      // console.log(docs.docs[0].data());
      const type = docs.docs[0].data().type;
      console.log(type);
      if (type) {
        // setType(type);
        type === "manager" ? Navigate(`/manager`) : Navigate(`/employee`);
      } else {
        return "No user Found";
      }
    } catch (err) {
      console.log(err);
    }
  };

  // signInWithEmailAndPassword(auth, email, password)
  //   .then((res) => {
  //     const uid = res.user.uid;
  //     const q = query(collection(db, "Employee"), where("uid", "==", uid));
  //     getDocs(q).then((res) => {
  //       console.log("result", res.docs[0].data());
  //     });
  //     // console.log(docs);
  //     // const type = docs.docs[0].data().type;

  //     if (type) {
  //       setType(type);
  //       type === "manager" ? Navigate(`/${type}`) : Navigate(`/${type}`);
  //     } else {
  //       return "No user Found";
  //     }
  //     alert("User Login Successfully");
  //     setEmail("");
  //     setPassword("");
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });

  return (
    <div>
      {/* <h2>Login Login</h2> */}
      <Container component="main" maxWidth="xs">
        <Card>
          <CardContent>
            <CssBaseline />
            <div>
              <Avatar style={{ margin: "0 auto" }}>
                <AccountCircleIcon />
              </Avatar>
              <h3>Login</h3>

              <form onSubmit={(e) => handleLogin(e)}>
                <TextField
                  name="email"
                  label="Enter Email"
                  type="email"
                  variant="outlined"
                  validators={["required", "isEmail"]}
                  value={email}
                  required
                  onChange={(e) => {
                    handleEmail(e);
                  }}
                />
                <br />
                <br />
                <TextField
                  id="filled-basic"
                  name="password"
                  variant="outlined"
                  type="password"
                  label="Enter password"
                  value={password}
                  required
                  onChange={(e) => {
                    handlePassword(e);
                  }}
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={rememberMe}
                      onChange={(e) => handleCheck(e)}
                    />
                  }
                  label="Remember Me"
                ></FormControlLabel>
                <br />
                <br />
                <Button type="submit" variant="contained">
                  Login
                </Button>
                <br />
                <br />
                <Divider />
                <Grid>
                  <Link onClick={props.toggle} className="account">
                    Don't have an account ? Sign Up
                  </Link>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
      {/* <form>
        <TextField
          name="fname"
          label="Enter First Name"
          variant="filled"
          value={formData.fname}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <br />
        <TextField
          id="filled-basic"
          name="lname"
          variant="filled"
          label="Enter Last Name"
          value={formData.lname}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {/* <h2>hi {formData.fname}</h2>
        <h2>hi {formData.lname}</h2> */}
      {/* <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl> */}
      {/* <FormGroup sx={{ textAlign: "center" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
            className="center"
            sx={{ textAlign: "center" }}
          />
        </FormGroup>
        <Button variant="contained">Submit</Button> */}
      {/* </form> */}
    </div>
  );
}

export default Login;
