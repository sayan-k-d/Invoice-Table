import ApiData from "@/components/ApiData";
import TableActions from "@/components/TableActions";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FadeLoader } from "react-spinners";

const InvoiceTable = ({ data, setData, loading }) => {
  const updateStatus = (pdf, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.pdf === pdf ? { ...row, status: newStatus } : row
      )
    );
  };

  return (
    <>
      <div className="container table-area">
        <TableContainer component={Paper} className="table-container">
          {loading ? (
            <FadeLoader className="loading-spinner" />
          ) : (
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
                {data.map((row) => (
                  <TableRow
                    key={row.pdf}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row" align="center">
                      <a href={`download/pdf/${row.pdf}`} download>
                        {row.displayPdf}
                      </a>
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">
                      <span
                        className={`status ${
                          row.status === "Done"
                            ? "done"
                            : row.status === "Pending"
                            ? "pending"
                            : ""
                        }`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <a href={`download/csv/${row.csv}`} download>
                        {row.displayCsv}
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      <TableActions
                        fileName={row.pdf}
                        updateStatus={updateStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </>
  );
};
export default ApiData(InvoiceTable, "files");
