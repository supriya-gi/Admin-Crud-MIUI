import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { Container, Button, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Manager(props) {
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const { formData } = props;
  const [rows, setRows] = useState([]);
  const [depts, setDepts] = useState("");
  const [querys, setQuerys] = useState(null);
  // const [edit, setEdit] = useState(false);
  // const [manager, setManager] = useState(false);

  // useEffect(() => {
  //   const value = window.location.href.split("/").includes("manager");
  //   if (value) {
  //     setManager(true);
  //   }
  //   console.log(rows);
  // }, []);

  //id == uid
  const handleChange = (e, uid) => {
    console.log("e", e, uid);
    updateDept(uid, e.target.value);
    setDepts(e.target.value);
  };
  //dept ===e.target.value
  const updateDept = async (uid, depts) => {
    const blogRef = doc(db, `Employee`, `${uid}`);
    await updateDoc(blogRef, {
      dept: depts,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleQuery = async (e) => {
    setQuerys(e.target.value);
    try {
      if (querys === "2") {
        const queryRef = query(
          collection(db, "Employee"),
          where("type", "==", "employee"),
          where("depts", "==", "It")
        );
        const snapshot = await getDocs(queryRef);
        const checkQuery = snapshot.docs.data();
        console.log(checkQuery);
        setRows(checkQuery);
        return checkQuery;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleData = async () => {
    try {
      const booking = query(
        collection(db, "Employee"),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(booking);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(rows);
    } catch (err) {
      console.log(err);
    }
    return rows;
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <Container component="main" maxWidth="md">
        <div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => handleQuery(e)}
            value={querys}
          >
            <FormControlLabel value="1" control={<Radio />} label="All Data" />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label=" Employee IT departments and location is Surat city"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Employee in Sales department"
            />
          </RadioGroup>
        </div>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ Width: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "black" }}>
                <TableCell style={{ color: "white " }}>FirstName</TableCell>
                <TableCell style={{ color: "white " }}>LastName</TableCell>
                <TableCell style={{ color: "white " }}>Gmail</TableCell>
                <TableCell style={{ color: "white " }}>Gender</TableCell>
                <TableCell style={{ color: "white " }}>Hobbies</TableCell>
                <TableCell style={{ color: "white " }}>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.fname}</StyledTableCell>
                  <StyledTableCell>{row.lname}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.gender}</StyledTableCell>
                  <StyledTableCell>{row.hobbies}</StyledTableCell>

                  <StyledTableCell>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={depts}
                        onChange={(e) => {
                          handleChange(e, row.id);
                        }}
                        // label="Age"
                      >
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="It">IT</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Manager;
