import spacing from 'material-ui/styles/spacing';

import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    spacing: spacing,
    fontFamily: 'Josefin Sans, Roboto, sans-serif', //fetched from script in index.html
    "palette": {
        "common": {"black": "#000", "white": "#fff"},
        "background": {"paper": "#fff", "default": "#fafafa"},
        "primary": {
            "light": "rgba(4, 58, 149, 0.77)",
            "main": "rgba(4, 58, 149, 1)",
            "dark": "rgba(3, 38, 96, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "rgba(255, 85, 85, 1)",
            "main": "rgba(245, 0, 0, 1)",
            "dark": "rgba(208, 2, 27, 1)",
            "contrastText": "#fff"
        },
        "error": {
            "light": "rgba(237, 237, 237, 0.63)",
            "main": "rgba(227, 227, 227, 1)",
            "dark": "rgba(182, 182, 182, 1)",
            "contrastText": "rgba(7, 7, 7, 1)"
        },
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
})
;

export default theme;
