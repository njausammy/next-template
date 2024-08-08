'use client'
import { ReactNode, useState } from 'react';
import {
  Card,
  Table,
  Container,
  TableContainer,
  TablePagination,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';
import DataTableHead from './TableHead';
import SearchNotFound from '../SearchNotFound';

interface DataTableProps {
  data: any[];
  columns: Array<{
    id: string;
    label: string;
    alignRight?: boolean;
    renderElement?: (row: any) => ReactNode;
  }>;
  onRowClick?: (row: any) => void;
  renderCell?: (columnId: string, row: any) => React.ReactNode;
  moreMenuContent?: (row: any) => React.ReactNode;
}

const DataTable = ({
  data,
  columns,
  onRowClick,
  renderCell,
  moreMenuContent,
}: DataTableProps) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const sortedData = applySortFilter(data, getComparator(order, orderBy));

  return (
    <Box>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <DataTableHead
            order={order}
            orderBy={orderBy}
            headLabel={columns}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  tabIndex={-1}
                  role="checkbox"
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.alignRight ? 'right' : 'left'}>
                      {column.renderElement
                        ? column.renderElement(row)
                        : renderCell
                          ? renderCell(column.id, row)
                          : row[column.id]}
                    </TableCell>
                  ))}
                  {moreMenuContent && (
                    <TableCell align="right">{moreMenuContent(row)}</TableCell>
                  )}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length + 2} />
              </TableRow>
            )}
          </TableBody>
          {sortedData.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={columns.length + 2} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery="" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

// Utility functions for sorting
const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order: string, orderBy: string) =>
  order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);

const applySortFilter = (array: any[], comparator: (a: any, b: any) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export default DataTable;
