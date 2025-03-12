
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import usePage11Hook from '../hooks/usePage11Hook';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Page11Table() {
    const { data, isLoading } = usePage11Hook();

    const colData: ColDef[] = React.useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]).map(key => ({
            field: key,
            sortable: true,
            filter: true,
        }));
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
      <AgGridReact
          rowData={data}
          columnDefs={colData}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[20]}
          rowSelection="multiple"
      />
    )
  }