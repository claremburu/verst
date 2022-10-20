import React, {useState, useEffect} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const menuItem = [20, 50, 100, 200];

function DashboardData() {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={value} onChange={handleChange}>
        {menuItem.map(item => (<MenuItem value={value}>{item}</MenuItem>))}
        </Select>
      </FormControl>
    </>
  );
}

export default DashboardData;
