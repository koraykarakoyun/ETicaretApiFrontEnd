import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div style={{ marginLeft: "64px" }}>

    <Stack direction="row" spacing={2}>

      <Button variant="outlined" href="#outlined-buttons">
        <Link to="/register">Register</Link>
      </Button>
      
      <Button variant="outlined" href="#outlined-buttons">
        <Link to="/login">Log In</Link>
      </Button>
    </Stack>
    </div>
  );
}
