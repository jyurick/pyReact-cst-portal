import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#003265', // Set toolbar color
        },
    },
    typography: {
        fontFamily: 'Myriad-Pro,Calibri,Arial,sans serif',
        body1: {
            color: '#494949', // Main font color
        },
    },
});

export default theme;