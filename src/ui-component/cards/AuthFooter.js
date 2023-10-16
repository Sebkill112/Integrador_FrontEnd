// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="center">
        <Typography variant="subtitle2" component={Link} href="http://localhost:3000/" target="_blank" underline="hover">
            TotalRisk.com &nbsp; &copy; {new Date().getFullYear()}
        </Typography>
    </Stack>
);

export default AuthFooter;
