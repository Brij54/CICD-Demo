import React from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import usePage11Hook from "../hooks/usePage11Hook";

const Page11Table: React.FC = () => {
  const { data, loading, error } = usePage11Hook(); // ✅ Use 'loading' instead of 'isLoading'

  const colData: ColDef[] = React.useMemo(
    () => [
      { headerName: "ID", field: "id", sortable: true, filter: true },
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Price", field: "price", sortable: true, filter: true }
    ],
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      {loading && <p>Loading data...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <AgGridReact rowData={data} columnDefs={colData} pagination={true} />
      )}
    </div>
  );
};

export default Page11Table;
