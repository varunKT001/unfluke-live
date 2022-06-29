import React, { useState, useEffect } from 'react';
import {
  SimpleMenu,
  EnhancedTableHead,
  EnhancedTableToolbar,
} from '../../components';
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
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStrategies, toggleStrategyStatus } from '../../api/strategies';
import { setEditStrategy as setEditStrategyOne } from '../../redux/slices/strategyOneSlice';
import { setEditStrategy as setEditStrategyTwo } from '../../redux/slices/strategyTwoSlice';

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
  const { strategies } = useSelector((store) => store.strategies);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = strategies.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - strategies.length) : 0;

  useEffect(() => {
    dispatch(fetchStrategies());
    // eslint-disable-next-line
  }, []);

  if (strategies.length < 1) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography>No strategies found...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          setSelected={setSelected}
          heading='My strategies'
        />
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
              rowCount={strategies.length}
              headCells={headCells}
            />
            <TableBody>
              {strategies
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const { id, ...rowWithoutId } = row;

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
                      <TableCell align='right'>
                        {`${row.strategySettings.startTime.hour}:
                        ${row.strategySettings.startTime.minute}:
                        ${row.strategySettings.startTime.second}`}
                      </TableCell>
                      <TableCell align='right'>
                        {`${row.strategySettings.endTime.hour}:
                        ${row.strategySettings.endTime.minute}:
                        ${row.strategySettings.endTime.second}`}
                      </TableCell>
                      <TableCell align='right'>
                        <Stack
                          direction='row'
                          spacing={1}
                          justifyContent='flex-end'
                        >
                          {getUniqueLegProps(
                            row.positions.legs,
                            'instrument'
                          ).map((instrument, index) => {
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
                          {getUniqueLegProps(row.positions.legs, 'segment').map(
                            (segment, index) => {
                              return (
                                <Chip
                                  size='small'
                                  key={index}
                                  label={segment}
                                />
                              );
                            }
                          )}
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
                            component={Link}
                            to={`/add-strategy-${
                              row.strategyType === 'strategy_one' ? '1' : '2'
                            }`}
                            value='edit'
                            onClick={() =>
                              row.strategyType === 'strategy_one'
                                ? dispatch(
                                    setEditStrategyOne({
                                      editStrategyId: id,
                                      ...rowWithoutId,
                                    })
                                  )
                                : dispatch(
                                    setEditStrategyTwo({
                                      editStrategyId: id,
                                      ...rowWithoutId,
                                    })
                                  )
                            }
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            value='start_stop'
                            onClick={() => dispatch(toggleStrategyStatus(id))}
                          >
                            Start/Stop
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
          count={strategies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
