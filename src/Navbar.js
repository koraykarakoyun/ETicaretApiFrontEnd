import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">

          <Typography variant="h6" color="error" component="div">
            <Button variant="outlined" color="error">
              <Link color='black' to="/listele">UrunleriListele</Link>
            </Button>
          </Typography>

          <Typography variant="h6" color="error" component="div">
            <Button variant="outlined" color="error">
            <Link to="/sil">UrunleriSil</Link>
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
