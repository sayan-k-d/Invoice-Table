import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const InvoiceData = ({ jsonData, isPaper, insights }) => {
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="nested-table-container">
          <table className="table table-sm nested-table">
            <thead>
              <tr>
                {Object.keys(value[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((val, i) => (
                    <td key={i}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return String(value);
  };
  return (
    <div className={`col-md-6 ${!isPaper ? "mh-600" : "mh-550"}`}>
      <Box display="flex" flexDirection="column" gap={2} height="100%">
        <div className={`data-container ${!isPaper ? "mh-600" : "mh-550"}`}>
          <h2 className="mb-4" style={{ fontSize: "1.3rem" }}>
            Extracted Data
          </h2>
          {jsonData ? (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(jsonData).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td className="value-cell">{renderValue(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>Upload a PDF to see extracted data</p>
            </div>
          )}
        </div>
        <Box className="api-text-container" maxHeight="200px">
          <h2 class="mb-3" style={{ fontSize: "1.3rem" }}>
            Insights
          </h2>
          {insights.length > 0 ? (
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <List>
                {insights.map((insight, index) => (
                  <ListItem key={index} sx={{ paddingTop: "0px" }}>
                    <ListItemText className="insight-text">
                      {insight}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Box className="empty-state">
              <Typography>API to get more Insights</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default InvoiceData;
