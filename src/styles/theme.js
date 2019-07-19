import { createMuiTheme } from '@material-ui/core';
import { color } from './constants';

export const theme = createMuiTheme({
	typography: {
    useNextVariants: true,
    fontSize:14
  },
	palette:{
		primary:{
			main:color.primary,
			contrastText:color.primaryTextColor
		},
		secondary:{
			main:color.secondary,
			contrastText:color.secondaryTextColor
		}
	}
})