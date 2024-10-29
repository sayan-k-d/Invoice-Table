import React, { useEffect, useState } from "react";
import axios from "axios";

const ApiData = (WrappedComponent, apiUrl) => {
  const WithApiData = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      axios
        .get(apiUrl)
        .then((response) => {
          const processedRows = response.data.map((item) => {
            const [pdfName, pdfDate] = item.pdf.split("&");
            const [csvName] = item.csv.split("&");

            return {
              displayPdf: pdfName + ".pdf",
              date: pdfDate?.replace(".pdf", ""),
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
    }, []);

    if (error)
      return <div className="display-error">Error: {error.message}</div>;

    return (
      <WrappedComponent
        data={data}
        loading={loading}
        setData={setData}
        {...props}
      />
    );
  };

  WithApiData.displayName = `WithApiData(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithApiData;
};

export default ApiData;
