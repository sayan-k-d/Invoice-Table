import TableActions from "@/components/TableActions";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const InvoiceTable = () => {
  function createData(filename, date, status, excel) {
    return { filename, date, status, excel };
  }
  const rows = [
    createData("File1.pdf", new Date().toUTCString(), "Pending", "File1.xlsx"),
    createData("File2.pdf", new Date().toUTCString(), "Pending", "File2.xlsx"),
    createData("File3.pdf", new Date().toUTCString(), "Pending", "File3.xlsx"),
    createData("File4.pdf", new Date().toUTCString(), "Pending", "File4.xlsx"),
    createData("File5.pdf", new Date().toUTCString(), "Pending", "File5.xlsx"),
  ];
  return (
    <>
      <div className="container">
        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Filename</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Excel</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.filename}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row" align="center">
                    <a href="/pdfs/sample.pdf" download>
                      {row.filename}
                    </a>
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <a href="/excels/sample.xls" download>
                      {row.excel}
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    <TableActions fileName={row.filename} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default InvoiceTable;
