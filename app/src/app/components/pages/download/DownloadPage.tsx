import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";

interface DownloadTask {
  filename: string;
}

const DownloadPage = () => {
  const columns = useMemo<MRT_ColumnDef<DownloadTask>[]>(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { style: { color: "green" } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
    ],
    [],
  );

  //pass table options to useMaterialReactTable
  //   const table = useMaterialReactTable({
  //     columns,
  //     data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  //   });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  //   return <MaterialReactTable table={table} />;
};

export default DownloadPage;
