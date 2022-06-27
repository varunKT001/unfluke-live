import React, { useState, useEffect } from 'react';
import {
  SimpleMenu,
  EnhancedTableHead,
  EnhancedTableToolbar,
} from '../components';
import {
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  MenuItem,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStrategies, toggleStrategyStatus } from '../api/strategies';
import { useNavigate } from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function getUniqueLegProps(legs, prop) {
  const propArray = legs.map((p) => p[prop]);
  return [...new Set([...propArray])];
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Strategy Name',
  },
  {
    id: 'startTime',
    numeric: true,
    disablePadding: false,
    label: 'Start Time',
  },
  {
    id: 'endTime',
    numeric: true,
    disablePadding: false,
    label: 'End Time',
  },
  {
    id: 'instruments',
    numeric: true,
    disablePadding: false,
    label: 'Instruments',
  },
  {
    id: 'segment',
    numeric: true,
    disablePadding: false,
    label: 'Segment',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];

export default function EnhancedTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { strategies } = useSelector((store) => store.strategies);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const createRows = (data) => {
    return [
      ...data.map((strategy) => {
        const {
          id,
          name,
          strategySettings: { startTime, endTime },
          status,
          positions: { legs },
        } = strategy;
        const start = `${startTime.hour}:${startTime.minute}:${startTime.second}`;
        const end = `${endTime.hour}:${endTime.minute}:${endTime.second}`;
        const instruments = getUniqueLegProps(legs, 'instrument');
        const segments = getUniqueLegProps(legs, 'segment');
        return { id, name, start, end, instruments, segments, status };
      }),
    ];
  };

  const editStrategy = (id) => {
    const strategy = strategies.find((s) => s.id === id);
    navigate(
      `/dashboard/edit-strategy-${
        strategy.strategyType === 'strategy_one' ? '1' : '2'
      }/${id}`
    );
  };

  const toggleStatus = (id) => {
    dispatch(toggleStrategyStatus(id));
  };

  useEffect(() => {
    dispatch(fetchStrategies());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setRows(createRows(strategies));
  }, [strategies]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} setSelected={setSelected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.start}</TableCell>
                      <TableCell align='right'>{row.end}</TableCell>
                      <TableCell align='right'>
                        <Stack
                          direction='row'
                          spacing={1}
                          justifyContent='flex-end'
                        >
                          {row.instruments.map((instrument, index) => {
                            return (
                              <Chip
                                size='small'
                                key={index}
                                label={instrument}
                              />
                            );
                          })}
                        </Stack>
                      </TableCell>
                      <TableCell align='right'>
                        <Stack
                          direction='row'
                          spacing={1}
                          justifyContent='flex-end'
                        >
                          {row.segments.map((segment, index) => {
                            return (
                              <Chip size='small' key={index} label={segment} />
                            );
                          })}
                        </Stack>
                      </TableCell>
                      <TableCell align='right'>
                        <Chip
                          color={row.status === 'active' ? 'success' : 'error'}
                          label={row.status}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <SimpleMenu label='actions'>
                          <MenuItem
                            value='edit'
                            onClick={() => editStrategy(row.id)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            value='stop'
                            onClick={() => toggleStatus(row.id)}
                          >
                            Stop
                          </MenuItem>
                          <MenuItem value='square_off'>
                            Square Off Trades
                          </MenuItem>
                        </SimpleMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
