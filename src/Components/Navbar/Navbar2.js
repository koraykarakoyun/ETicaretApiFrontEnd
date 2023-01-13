import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authanticated, notauthanticated } from '../../Redux/Action/AuthAction';
import { search } from '../../Redux/Action/SearchAction';
import { bindActionCreators } from 'redux';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import home from "../../Image/home.png"
import AdminDrawer from '../AdminDrawer/AdminDrawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect } from 'react';
import { api } from '../../Utilities/Api';
import { useState } from 'react';
import { BadgeCount } from '../../Redux/Action/BadgeAction';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '50%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const linkstyle = {
    color: 'black',
    textDecoration: "none",
    fontSize: "0.9rem"
}



function Navbar2(props) {

    useEffect(() => {

        api("GET", "localhost", "7098", "baskets", "getbasketitem", null, null).then((data) => {
            props.BadgeCount(String(data[0].count));

        });
    },[])




    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        props.notauthanticated();
        console.log(props.authstate);
        handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            {
                props.authstate.isAuth ? (
                    <>
                        <MenuItem onClick={handleMenuClose} style={linkstyle} >Profilim</MenuItem>
                        <MenuItem onClick={handleMenuClose} style={linkstyle} >Hesabım</MenuItem>
                        <MenuItem onClick={handleMenuClose} style={linkstyle} >
                            <Link to="/myorders">Siparişlerim</Link></MenuItem>
                        <MenuItem onClick={logout} style={linkstyle} >Çıkış Yap</MenuItem>

                    </>
                ) : (<>
                    <MenuItem onClick={handleMenuClose}> <Link style={linkstyle} to="/login">Giriş Yap</Link></MenuItem>
                    <MenuItem onClick={handleMenuClose}><Link style={linkstyle} to="/register">Kayıt Ol</Link></MenuItem>

                </>)
            }


        </Menu>
    );


    return (
        <Box >
            <AppBar style={{ backgroundColor: "#193441" }} position="static">
                <Toolbar style={{ height: "6rem" }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 3.5 }}>
                    </Typography>
                    <Link to="/">
                        <img
                            src={home}
                            style={{ height: "6rem" }}
                        />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 6 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase onChange={(event) => {
                                props.search(event.target.value)
                            }}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Typography>
                    {

                        props.authstate.isAuth ? (

                            props.authstate.role === "Admin" || props.authstate.role === "Moderator" ? (<>
                                <IconButton>
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                                        <AdminDrawer></AdminDrawer>
                                    </Box>

                                </IconButton>

                            </>) : (null)

                        ) : (null)
                    }

                    <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                        <IconButton >
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {
                                    props.authstate.isAuth ? (
                                        <Link style={{ color: 'white', fontSize: "0.9rem", textDecoration: "none" }} to="/mybasket">
                                            <StyledBadge style={{ marginRight: "1rem" }} badgeContent={props.badgestate.count} color="secondary">
                                                <ShoppingCartIcon />
                                            </StyledBadge>
                                            Sepetim</Link>
                                    ) : (
                                        <Link style={{ color: 'white', fontSize: "0.9rem", textDecoration: "none" }} to="/login">
                                            <StyledBadge color="secondary">
                                                <ShoppingCartIcon />
                                            </StyledBadge>Sepetim</Link>
                                    )
                                }

                            </Box>
                        </IconButton>
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 4 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Box style={{ fontSize: "0.9rem" }}>
                                    <PersonOutlineIcon></PersonOutlineIcon>
                                    {
                                        props.authstate.isAuth ?
                                            "Hesabım"
                                            : "Giriş Yap"
                                    }
                                </Box>

                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"

                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>

                    </Typography>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <hr style={{ margin: "0", color: "white", height: "1px" }}></hr>
        </Box>

    );
}



const mapStateToProps = (state) => {
    return {
        authstate: state.auth,
        searchstate: state.search,
        badgestate: state.badge
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ search, authanticated, notauthanticated,BadgeCount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2)
