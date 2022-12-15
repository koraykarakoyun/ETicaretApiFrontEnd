import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IconButton } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AdminDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const anchor = "Admin Panel"
    const leftmenustyle = {textDecoration:"none",color: "black" }
    const linkstyle = { textDecoration:"none", width: "100%" }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <ListItem disablePadding>
                <Link style={linkstyle} to="/adminpanel/products">
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText style={leftmenustyle} primary={"Ürünler"} />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />

            <ListItem disablePadding>
                <Link style={linkstyle} to="/adminpanel/orders">
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText style={leftmenustyle} primary={"Siparişler"} />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <Link style={linkstyle} to="/adminpanel/users">
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText style={leftmenustyle} primary={"Kullanıcılar"} />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <Link style={linkstyle} to="/adminpanel/roles">
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText style={leftmenustyle} primary={"Roller"} />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <Link style={linkstyle} to="/adminpanel/auth">
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText style={leftmenustyle} primary={"Yetkilendirme"} />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />

        </Box>
    );

    return (
        <div>
            {
                <React.Fragment key={anchor}>

                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <>
                            <AdminPanelSettingsIcon style={{ color: "white" }}></AdminPanelSettingsIcon>
                            <p style={{ margin: "auto", color: "white", fontSize: "0.9rem", textDecoration: "none" }}>Admin Paneli</p>
                        </>
                    </IconButton>


                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {
                            console.log(anchor)
                        }
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            }
        </div>
    );
}
