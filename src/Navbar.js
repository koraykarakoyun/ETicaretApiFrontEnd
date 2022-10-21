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
import HomeIcon from '@mui/icons-material/Home';

function ButtonAppBar(props) {
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
                <Button><Link style={{ color: 'white' }} to="/"> <HomeIcon></HomeIcon></Link></Button>
                <Button><Link style={{ color: 'white' }} to="/adminpanel">Admin Paneli</Link></Button>
                <Button style={{ color: "white" }} onClick={() => {
                  props.notauthanticated();

                }}><Link style={{ color: 'white' }} to="/">Log Out</Link></Button>

                <Button><Link style={{ color: 'white' }} to="/mybasket">MyBasket</Link></Button>
              </>
            ) : (<>
              <Button><Link style={{ color: 'white' }} to="/"> <HomeIcon></HomeIcon></Link></Button>
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
