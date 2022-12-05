import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { TableRows } from "@mui/icons-material";
// import { setRows } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
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
function Employee() {
  const { uid } = useParams();
  const Navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };
  const handleData = async () => {
    try {
      const blog = query(
        collection(db, "Employee"),
        where("uid", "==", uid),
        where("type", "==", "employee")
        // where("doc.id", "==", "doc.id")
      );
      const snapshot = await getDocs(blog);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log("uid", rows[0].id)
      setRows(rows);

      return rows;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleData();
  }, [uid]);

  return (
    <div>
      <br />
      <Button type="submit" variant="contained" onClick={logOut}>
        Logout
      </Button>
      <br />
      <Container component="main" maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ Width: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "black" }}>
                <TableCell style={{ color: "white " }}>FirstName</TableCell>
                <TableCell style={{ color: "white " }}>LastName</TableCell>
                <TableCell style={{ color: "white " }}>Gmail</TableCell>
                <TableCell style={{ color: "white " }}>Gender</TableCell>
                <TableCell style={{ color: "white " }}>Hobbies</TableCell>
                <TableCell style={{ color: "white " }}>City</TableCell>
                <TableCell style={{ color: "white " }}>Salary</TableCell>
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
                  <StyledTableCell>{row.city}</StyledTableCell>
                  <StyledTableCell>{row.salary}</StyledTableCell>
                  <StyledTableCell>{row.dept}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Employee;
