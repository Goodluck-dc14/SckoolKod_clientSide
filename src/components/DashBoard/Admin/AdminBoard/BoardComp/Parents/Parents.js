import * as React from "react";
import styledComponents from "styled-components";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { GlobalState } from "../../../../../ContexGlobal/Global";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Parents = () => {
  const { classID } = useParams();
  const adminUser = useSelector((state) => state.user);

  const [allStudents, setAllStudents] = React.useState([]);

  console.log(classID);

  const getStudents = async () => {
    const globalURL = "https://sckoolkode-bakend.herokuapp.com";
    const localURL = "http://localhost:2332";
    const url = `${globalURL}/api/admin/${adminUser._id}/students/get`;

    await axios.get(url).then((res) => {
      setAllStudents(res.data.data.students);
      console.log(res.data.data.students);
    }, []);
  };

  React.useEffect(() => {
    getStudents();
    console.log(allStudents);
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <h3>Parents</h3>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Student Name</StyledTableCell>
                  <StyledTableCell align="right">Father's Name</StyledTableCell>
                  <StyledTableCell align="right">Mother's Name</StyledTableCell>
                  <StyledTableCell align="right">
                    Father's Occuatiom
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Parent's Phone No
                  </StyledTableCell>
                  <StyledTableCell align="right">House Address</StyledTableCell>
                  <StyledTableCell align="right">ClassRoom</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudents.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.parentName1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.parentName2}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.FathersOccupation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.parentPhone}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.nameOfClass}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Parents;

const Container = styledComponents.div`
  min-height: calc(100vh - 50px);
  margin-top: 50px;
  background-color: #f0f1f3;
  width: calc(100vw - 180px);
  margin-left: 180px;
  background-color: #f0f1f3;
  display: flex;
  justify-content: center;
  font-family: poppins;

  @media (max-width: 770px) {
    margin-left: 50px;
    width: calc(100vw - 50px);
  }
  @media (max-width: 500px) {
    margin-left: 0;
    width: 100vw;
  }
`;
const Wrapper = styledComponents.div`
width: 1150px;
@media (max-width: 1150px) {
  width: 95%;
}
`;

const DisplayBtnHold = styledComponents.div`
display: flex;
justify-content: space-between;
align-items: center;

button{
  height: 30px;
  width: 110px;
  border: 0;
  outline: none;
  /* background-color: #ffa301; */
  background-color: #031e3e;
  color: #fff;
  font-family: poppins;
  font-weight: 700;
  margin: 0 8px;
  border-radius: 4px;
  cursor: pointer;
}
`;