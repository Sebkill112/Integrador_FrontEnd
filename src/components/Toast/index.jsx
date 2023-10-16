import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const CustomToast = ({ open, message, duration, action, onClose, severity, sx }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={duration} action={action} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%', color: 'white', ...sx }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

CustomToast.defaultProps = {
    action: null,
    severity: 'info',
    sx: {}
};

CustomToast.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    severity: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
    sx: PropTypes.object,
    action: PropTypes.func
};

export default CustomToast;
