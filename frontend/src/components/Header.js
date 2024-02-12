import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <nav>
                    <Button color="inherit">CST PORTAL</Button>
                </nav>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
