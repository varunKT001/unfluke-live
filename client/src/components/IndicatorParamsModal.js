import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { indicatorOptions } from '../utils/constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ label, indicator }) {
  const [open, setOpen] = React.useState(false);
  const [indicatorParameters, setIndicatorParameters] = React.useState([]);
  const [state, setState] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getIndicator() {
    setIndicatorParameters(
      indicatorOptions.find((i) => i.value === indicator.name)?.params
    );
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSave() {
    const event = {
      target: {
        name: indicator.propertyName,
        value: state,
      },
    };
    indicator.onSave(event);
  }

  React.useEffect(() => {
    getIndicator();
    // eslint-disable-next-line
  }, [indicator]);

  React.useEffect(() => {
    setState((prev) => {
      const items = indicatorParameters.map((item) => item.name);
      prev['OHLC'] = '';
      for (let item of items) {
        prev[item] = '';
      }
      return { ...prev };
    });
    // eslint-disable-next-line
  }, [indicatorParameters]);

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen}>
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Stack spacing={2} sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Parameters
          </Typography>
          {indicatorParameters.map((item, index) => {
            return (
              <Stack key={index}>
                <Typography textTransform='capitalize'>{item.name}</Typography>
                <TextField
                  name={item.name}
                  type='number'
                  size='small'
                  value={state[item.name] || item.default}
                  onChange={handleChange}
                />
              </Stack>
            );
          })}
          <FormControl size='small'>
            <Typography textTransform='capitalize'>OHLC</Typography>
            <Select
              name='OHLC'
              value={state['OHLC'] || 'open'}
              onChange={handleChange}
            >
              <MenuItem value='open'>Open</MenuItem>
              <MenuItem value='close'>Close</MenuItem>
              <MenuItem value='high'>High</MenuItem>
              <MenuItem value='low'>Low</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}
