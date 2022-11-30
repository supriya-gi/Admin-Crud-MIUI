import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableRows } from "@mui/icons-material";
// import { setRows } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function ManagerLogin() {
  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  // ];
  const [rows, setRows] = useState([]);
  // const getAllData = () => {
  //   return getDocs(collection(db, "Employee"))
  //     .then((res) => setRows(res.docs))
  //     .catch((err) => {
  //       console.log("erroe", err);
  //     });
  // };
  const handleData = async () => {
    return getDocs(collection(db, "Employee"))
      .then((res) => setRows(res.docs))
      .catch((err) => {
        // console.log("erroe", err);
      });
    // try {
    //   then((res) => setRows(res.docs));
    // } catch (err) {
    //   console.log(err);
    // }
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <Container component="main" maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ Width: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "black" }}>
                <TableCell style={{ color: "white " }}>Fname</TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Lname
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Gender
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Hobbies
                </TableCell>
                {/* <TableCell style={{ color: "white " }} align="right">
                  Protein&nbsp;(g)
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((el, index) => {
                console.log("ele", rows);
                return <TableRows key={index} row={el.data()} formdata={el} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ManagerLogin;
