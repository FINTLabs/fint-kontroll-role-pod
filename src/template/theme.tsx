import { createTheme } from '@mui/material/styles';

// @ts-ignore
const theme = createTheme({
    palette: {
        secondary: {
            light: '#7fb434',
            main: '#5FA202',
            dark: '#427101',
        },
        primary: {
            light: '#4b727a',
            main: '#1F4F59',
            dark: '#15373e',
        },
    },
    spacing: 8,
    typography: {
        h2: {
            fontSize: '5em',
            fontWeight: "bold",
        },
        fontFamily: [
            "Nunito Sans", 'sans-serif'
        ].join(',')
    },

    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained" },
                    style: {
                        color: "blue",
                    }
                }
            ],
            defaultProps: {
                style: {
                    textAlign: "right"
                }
            }
        }
    }
});

export default theme;