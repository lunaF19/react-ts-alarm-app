import { useState, useEffect, useLayoutEffect } from 'react';
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme, StyledEngineProvider, createTheme, useColorScheme
} from '@mui/material/styles';

import { Button } from "@mui/material"
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';


import { teal, deepOrange, orange, cyan } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';


const theme = experimental_extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange,
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange,
            },
        },
    },
});


type modeThemeType = "light" | "dark"

interface Props {
    children: JSX.Element
}


const setItemThemeLS = (string: modeThemeType) => {
    window.localStorage.setItem("theme-mode", string);
}
const getItemThemeLS = (): modeThemeType => {
    const themeMode = window.localStorage.getItem("theme-mode") as modeThemeType;
    if (!themeMode) setItemThemeLS("dark")
    return themeMode;

}



export default function (props: Props) {
    const [mode, setMode] = useState<modeThemeType>(getItemThemeLS());

    const { children } = props;

    const theme2 = createTheme({
        palette: {
            mode: mode
        }
    })


    const toggleChangeMode = () => {
        const newMode = mode === "light" ? "dark" : "light"
        setMode(newMode)
        setItemThemeLS(newMode)
    }

    return (
        <ThemeProvider theme={theme2}>
            {children}
            <div style={{ position: "fixed", right: "10px", bottom: "10px" }} onClick={toggleChangeMode}>
                <Button variant="contained" size="large">
                    {
                        mode === "light" ? (<Sun />) : (<Moon />)
                    }

                </Button>



            </div>
        </ThemeProvider>
    );
}

// export default function (props: Props) {
//     const { children } = props;

//     return (
//         <div id="css-vars-custom-theme" >
//             <CssVarsProvider
//                 theme={theme}
//                 colorSchemeSelector="#css-vars-custom-theme"
//                 colorSchemeStorageKey="custom-theme-color-scheme"
//                 modeStorageKey="custom-theme-mode"
//             >
//                   <Paper sx={{innerHeight: "100vh"}}>
//                     {children}
//                   </Paper>
//             </CssVarsProvider>
//         </div>
//     );
// }