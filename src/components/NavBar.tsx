import { useState } from 'react'
import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { RootState } from "../store/index"

export default function MenuAppBar() {
    const navigate = useNavigate();

    const { logged } = useSelector((store: RootState) => store.auth);

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (cb: Function) => {
        setAnchorEl(null);
        if (typeof cb === "function") cb()
    };

    return (
        <AppBar position="sticky">
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Alarm App React
                </Typography>
                {/* <ColorSchemePicker /> */}
                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Box>


                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >

                                {
                                    logged ? (
                                        <div>
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={() => handleClose(navigate("/auth/logout"))}>Logout</MenuItem>
                                        </div>
                                    )
                                        : (
                                            <div>
                                                <MenuItem onClick={() => handleClose(navigate("/auth/login"))}>Login</MenuItem>
                                                <MenuItem onClick={() => handleClose(navigate("/auth/register"))}>Register</MenuItem>
                                            </div>
                                        )
                                }


                            </Menu>
                        </Box>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}