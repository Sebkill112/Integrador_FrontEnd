// material-ui

import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/Nuevo_Logo_Total_Risk_2.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ width }) => <img src={logo} alt="Miencarga logo" width={width} style={{ display: 'block', margin: 'auto' }} />;

export default Logo;
