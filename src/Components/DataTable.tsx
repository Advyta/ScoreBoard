import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  // TablePagination,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";

// Project:     Reactjs Practice
// Module:       Enrollment Module
// Component:   Table Component
// Author:      Advyta
// Date:        20 Nov 2024
// Logic:
// This component gets columns and rows data for the selected grade and It renders a Table using material UI.
//  Generates table columns dynamically based on keys from the data and lets the user sort the data. It also lets the user
// select which column should have sort enabled and it also lets the user align the data

// Usage: Provide correct columnData and row data. columnData should be an array of objects each object should have
// correct IDataTableColumn related data. And rows should be an array.

export interface IDataTableColumn {
  id: string;
  name: string;
  enableSort?: boolean;
  align?: "center" | "inherit" | "justify" | "left" | "right";
}

interface IDataTableHeadProps {
  columns: IDataTableColumn[];
  order: Order;
  orderBy: keyof any;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => void;
}

interface IDataTableProps {
  rows: any[];
  columnData?: IDataTableColumn[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DataTableHead: React.FC<IDataTableHeadProps> = ({
  columns,
  order,
  orderBy,
  onRequestSort,
}): JSX.Element => {
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="left"
            sortDirection={orderBy === column.id ? order : false}
          >
            {column.enableSort ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.name}
              </TableSortLabel>
            ) : (
              column.name
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const DataTable: React.FC<IDataTableProps> = ({
  columnData,
  rows,
}): JSX.Element => {
  let internalColumnData: IDataTableColumn[] = [];

  // Infer columns if columnData is not provided
  if (!columnData) {
    if (rows.length) {
      internalColumnData = Object.keys(rows[0]).map((key) => ({
        id: key,
        name: key,
        align: "inherit", // Default alignment
        enableSort: false, // Default sorting
      }));
    }
  } else {
    internalColumnData = columnData;
  }

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("");
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handlePageChange: (event: unknown, newPage: number) => void = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleRowsPerPageChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <Paper
        sx={{
          width: "100%",
          marginBottom: 2,
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 400, // Set max height for scrollable container
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <Table
            stickyHeader
            sx={{
              minWidth: 750,
              tableLayout: "fixed",
              "& .MuiTableCell-head": {
                textTransform: "capitalize",
                fontWeight: "bold",
              },
            }}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <DataTableHead
              columns={internalColumnData}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {internalColumnData.map((column, index) => (
                      <TableCell
                        align={column.align || "inherit"} // Safeguard align
                        key={`${rowIndex}-${column.id}`}
                      >
                        {row[column.id] || "-"} {/* Handle missing data */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};

export default DataTable;
