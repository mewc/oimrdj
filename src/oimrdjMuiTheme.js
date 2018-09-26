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
            "light": "rgba(151, 0, 245, 0.4)",
            "main": "rgba(151, 0, 245, 1)",
            "dark": "rgba(128, 0, 208, 1)",
            "contrastText": "#fff"
        },
        "error": {
            "light": "rgba(244, 173, 54, 0.63)",
            "main": "rgba(244, 173, 54, 1)",
            "dark": "rgba(192, 138, 46, 1)",
            "contrastText": "#fff"
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
