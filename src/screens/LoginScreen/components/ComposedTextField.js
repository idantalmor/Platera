import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function ComposedTextField({type, text, value, setValue, style}) {

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <InputLabel htmlFor="component-outlined">{text}</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={value}
          type={type === 'password' && 'password'}
          onChange={handleChange}
          label="Email"
          style={style && {backgroundColor:'#D5D0D0', width:500, height: 100}}
        />
      </FormControl>
    </Box>
  );
}