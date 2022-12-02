import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import LockRound from "@mui/material/Icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  Divider,
  Button,
  CardContent,
  CssBaseline,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import firebase from "../firebase";
import { auth } from "../firebase";
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";
// const checkboxes = [
//   { id: 1, text: "Reading" },
//   { id: 2, text: "Watching Movie" },
//   { id: 3, text: "Dancing" },
//   { id: 4, text: "Swimming" },
// ];
function SignUp(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    gender: "",
    hobbies: "",
    type: "",
    // dept: "",
  });
  // const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  // const handleCheckChange = (id) => {
  //   const findIdx = selectedCheckbox.indexOf(id);

  //   let selected;
  //   if (findIdx > -1) {
  //     selected = selectedCheckbox.filter((checkboxId) => checkboxId !== id);
  //   } else {
  //     selected = [...selectedCheckbox, id];
  //   }
  //   setSelectedCheckbox(selected);
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // get user Data from authentication(res) and set to Firestore
  const createUserDocument = async (user, formData) => {
    if (!user) return;

    const { email } = formData;
    const { password } = formData;
    const { fname } = formData;
    const { lname } = formData;
    const { gender } = formData;
    const { hobbies } = formData;
    const { type } = formData;
    const uid = user.user.uid;
    console.log(user);

    await setDoc(doc(db, `Employee`, `${user?.user.uid}`), {
      email,
      password,
      fname,
      lname,
      gender,
      hobbies,
      type,
      uid,
      dept: "",
      //   createdAt: new Date(),
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("email", formData.email, "pass", formData.password);
    //Funtion to Sign Up with Authentication
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then((res) => {
        if (res) {
          createUserDocument(res, formData);
          console.log("res", res, "hi", formData);
          props.toggle();
          toast.success("User Register Successfully");
        }
      })
      .catch((error) => {
        console.log("error", error);
        switch (error.code) {
          case "email-already-use-in":
            toast.error(error.message);
            break;
          case "invalid-email":
            toast.error(error.message);
            break;
        }
      });
  };
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Card>
          <CardContent>
            <CssBaseline />
            <div className="center">
              <Avatar style={{ margin: "0 auto" }}>
                <AccountCircleIcon />
              </Avatar>

              {/* <Typography>
                <strong>Employee Login</strong>
              </Typography> */}
              <h3>Sign Up</h3>

              <form onSubmit={(e) => handleSignUp(e)}>
                <TextField
                  style={{ marginRight: "20px" }}
                  name="email"
                  id="outlined-basic"
                  label="Enter Email"
                  type="email"
                  variant="outlined"
                  validators={["required", "isEmail"]}
                  value={formData.email}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <TextField
                  id="filled-basic"
                  name="password"
                  variant="outlined"
                  type="password"
                  label="Enter password"
                  value={formData.password}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />
                <br />
                <TextField
                  style={{ marginRight: "20px" }}
                  name="fname"
                  id="outlined-basic"
                  label="Enter First Name"
                  type="text"
                  variant="outlined"
                  //   validators={["required", "isEmail"]}
                  value={formData.fname}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <TextField
                  name="lname"
                  id="outlined-basic"
                  label="Enter Last Name"
                  type="text"
                  variant="outlined"
                  //   validators={["required", "isEmail"]}
                  value={formData.lname}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br /> <br />
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <br /> <br />
                {/* <FormControl className="hobbies">
                  <Typography>Select Hobbies</Typography>
                  <br />
                  <FormGroup
                    style={{ flexDirection: "row" }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {checkboxes.map((checkbox) => (
                      <FormLabel key={checkbox.id}>
                        {checkbox.text}
                        <FormControlLabel
                          value={checkbox.id}
                          // type="checkbox"
                          control={<Checkbox />}
                          onChange={() => handleCheckChange(checkbox.text)}
                          selected={selectedCheckbox.includes(checkbox.text)}
                        />
                      </FormLabel>
                    ))}
                  </FormGroup>
                </FormControl> */}
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Minimum 3 rows"
                  style={{ width: 200 }}
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />
                <br />
                <Box sx={{ Width: "100px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type"
                      label="Type"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="employee">Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <br />
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
                <br />
                <br />
                <Divider />
                <Grid>
                  <Link onClick={props.toggle} className="account">
                    Already account ? Login
                  </Link>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default SignUp;
