import { Box, Chip, Typography } from "@mui/material";
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

  const getChipColor = (index) => {
    if (index === insights.length - 1) {
      // Last insight (Bill value check)
      const isTrue = insights[index].toLowerCase().includes("true");
      return {
        backgroundColor: isTrue ? "#c7f9cc" : "#ffebee",
        color: isTrue ? "#22577a" : "#c62828",
        "&:hover": {
          backgroundColor: isTrue ? "#80ed99" : "#ffcdd2",
        },
      };
    }
    // For other insights, use default green color
    return {
      backgroundColor: "#c7f9cc",
      color: "#22577a",
      "&:hover": {
        backgroundColor: "#80ed99",
      },
    };
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
          <h2 className="mb-3" style={{ fontSize: "1.3rem" }}>
            Insights
          </h2>
          {insights.length > 0 ? (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              sx={{
                "& .MuiChip-root": {
                  padding: "0.5rem",
                  height: "50px",
                },
              }}
            >
              {insights.map((insight, index) => (
                <Chip
                  key={index}
                  label={insight}
                  size="medium"
                  sx={{
                    borderRadius: "16px",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    ...getChipColor(index),
                  }}
                />
              ))}
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
