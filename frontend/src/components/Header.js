import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <nav>
                    <Button color="inherit">Search</Button>
                    <Button color="inherit">Add Client</Button>
                    {/* Add more navigation links as needed */}
                </nav>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
