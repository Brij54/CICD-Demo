import React from "react";
import "./Page1.css";
import Page1Card1 from "./Page1Card1";
import usePage1Hook from "../hooks/usePage1Hook";

const Page1: React.FC = () => {
  const { data, loading, error } = usePage1Hook();

  return (
    <div className="page-container">
      <input className="form-control" placeholder="Search..." id="id-1" />
      <input className="form-control" placeholder="Filter..." id="id-3" />

      {loading && <p>Loading data...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div id="id-5" className="d-flex border border-2 h-50">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((product) =>
            product ? (
              <Page1Card1 key={product.id || Math.random()} product={product} />
            ) : null
          )
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Page1;
