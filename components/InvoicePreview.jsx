import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState } from "react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const InvoicePreview = ({
  selectedFile,
  onDocumentLoadSuccess,
  pageNumber,
  numPages,
  setPageNumber,
  isPaper,
}) => {
  const [scale, setScale] = useState(0.5);

  return (
    <div className="col-md-6">
      <div className={`preview-container ${!isPaper ? "mh-600" : "mh-550"}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ fontSize: "1.3rem" }}>
            Invoice Preview
          </h2>
          {selectedFile && (
            <div className="zoom-controls">
              <select
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="form-select form-select-sm"
                style={{ width: "auto" }}
              >
                <option value={0.5}>50%</option>
                <option value={0.75}>75%</option>
                <option value={1.0}>100%</option>
                <option value={1.25}>125%</option>
                <option value={1.5}>150%</option>
                <option value={2.0}>200%</option>
              </select>
            </div>
          )}
        </div>
        {selectedFile ? (
          <div className="pdf-preview">
            <Document
              file={selectedFile}
              onLoadSuccess={onDocumentLoadSuccess}
              className="w-100 pdf-canvas"
            >
              <Page
                pageNumber={pageNumber}
                className="w-100"
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale}
              />
            </Document>
            {numPages && numPages > 1 && (
              <div className="text-center mt-3">
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setPageNumber((prev) => Math.max(1, prev - 1))
                    }
                    disabled={pageNumber <= 1}
                  >
                    Previous
                  </button>
                  <button className="btn btn-outline-secondary" disabled>
                    Page {pageNumber} of {numPages}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setPageNumber((prev) => Math.min(numPages, prev + 1))
                    }
                    disabled={pageNumber >= numPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="pdf-preview">
            <p>No PDF selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePreview;
