import ApiData from "@/components/ApiData";
import HomeContent from "@/components/HomeContent";
import TableActions from "@/components/TableActions";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

const InvoiceTable = ({ data, setData, loading }) => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("loginStatus")) {
      router.push("/Login");
      return;
    }
  }, []);

  const updateStatus = (pdf, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.pdf === pdf ? { ...row, status: newStatus } : row
      )
    );
  };

  return (
    <Box display="flex" minHeight="100vh">
      <HomeContent />
      <Box
        sx={{
          mt: 2,
          p: 2,
        }}
        width="100%"
      >
        <div className="container-fluid table-area">
          <TableContainer component={Paper} className="table-container">
            {loading ? (
              <FadeLoader className="loading-spinner" />
            ) : (
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Filename</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Excel</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.pdf}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row">
                        <a href={`download/pdf/${row.pdf}`} download>
                          {row.displayPdf}
                        </a>
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
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
                      <TableCell>
                        <a href={`download/csv/${row.csv}`} download>
                          {row.displayCsv}
                        </a>
                      </TableCell>
                      <TableCell>
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
      </Box>
    </Box>
  );
};
export default ApiData(InvoiceTable, "files");
