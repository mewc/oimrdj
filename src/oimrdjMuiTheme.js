import {grey50, grey200, grey300, grey900,
    yellow700, yellow600,
    orange900, orange600,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Josefin Sans, Roboto, sans-serif', //fetched from script in index.html
    palette: {
        primary1Color: yellow700,
        primary2Color: yellow600,
        primary3Color: grey300,
        accent1Color: grey200,
        accent2Color: orange900,
        accent3Color: orange600,
        textColor: grey900,
        midTextColor: grey300,
        alternateTextColor: grey50,
        canvasColor: grey50,
        borderColor: grey200,
        disabledColor: fade(grey900, 0.2),
        pickerHeaderColor: yellow700,
        clockCircleColor: fade(grey900, 0.4),
        shadowColor: grey900
    },
};
