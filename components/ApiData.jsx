import React, { useEffect, useState } from "react";
import axios from "axios";
const ApiData = (WrappedComponent, apiUrl) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      axios
        .get(apiUrl)
        .then((response) => {
          const processedRows = response.data.map((item) => {
            const [pdfName, pdfDate] = item.pdf.split("&");
            const [csvName, _] = item.csv.split("&");

            return {
              displayPdf: pdfName + ".pdf",
              date: pdfDate.replace(".pdf", ""),
              displayCsv: csvName + ".csv",
              pdf: item.pdf,
              csv: item.csv,
              status: "Pending",
            };
          });
          setData(processedRows);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, [apiUrl, setData, setLoading, setError]);
    if (error) return <div>Error: {error.message}</div>;

    return (
      <WrappedComponent
        data={data}
        loading={loading}
        setData={setData}
        {...props}
      />
    );
  };
};

export default ApiData;
