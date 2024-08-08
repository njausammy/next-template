// DataTableHead.tsx
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

const visuallyHidden = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
} as const;

type DataTableHeadProps = {
    order: 'asc' | 'desc';
    orderBy: string;
    headLabel: any[];
    onRequestSort: (id: string) => void;
};

const DataTableHead = ({
    order,
    orderBy,
    headLabel,
    onRequestSort,
}: DataTableHeadProps) => {
    return (
        <TableHead>
            <TableRow>

                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => onRequestSort(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box sx={{ ...visuallyHidden }}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default DataTableHead;
