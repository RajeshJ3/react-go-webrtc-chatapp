import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    "palette": {
        "type": "light",
        "background": {
            "default": "#fafafa",
            "paper": "#fff",
            "light": "#3c4e5d",
            "dark": "#232d36",
        },
        "primary": {
            "light": '#757ce8',
            "main": '#232d36',
            "dark": '#002884',
            "contrastText": '#fff',
        },
        "divider": "rgba(0, 0, 0, 0.12)",
        "text": {
            "primary": "#d2d7d9",
            "secondary": "#099080",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "dark": "rgba(0, 0, 0, 0.8)",
            "darker": "rgba(0, 0, 0, 1)",
        },
        "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "selected": "rgba(0, 0, 0, 0.08)",
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)"
        }
    }
});

export default theme;