import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authanticated, notauthanticated } from './Redux/Action/AuthAction';
import { bindActionCreators } from 'redux';

function ButtonAppBar(props) {


  console.log(props.authstate)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>



          {
            props.authstate ? (
              <>
                <Button><Link style={{ color: 'white' }} to="/products">Products</Link></Button>
                <Button style={{ color: "white" }} onClick={() => {
                    props.notauthanticated();
                    
                }}>Log Out</Button>
              </>
            ) : (<>
              <Button><Link style={{ color: 'white' }} to="/login">Login</Link></Button>
              <Button><Link style={{ color: 'white' }} to="/register">Register</Link></Button>
            </>)
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}


const mapStateToProps = (state) => {
  return {
    authstate: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({ authanticated, notauthanticated }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar)
