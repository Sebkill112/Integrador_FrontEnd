import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import PropTypes from 'prop-types';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const styles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        display: 'flex',
        alignItems: 'center'
    }
};

export default function FullScreenDialog({ keepMounted, title, open, handleClose, children, image, styles }) {
    return (
        <Dialog
            keepMounted={keepMounted}
            fullScreen
            open={open}
            onClose={handleClose}
            disableEscapeKeyDown
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar style={{ backgroundColor: '#d67834', ...styles?.toolbar }}>
                    <Box style={styles?.box}>
                        {image}

                        <Typography sx={{ ml: 2, flex: 1, color: '#fff' }} variant="h3" component="div">
                            {title}
                        </Typography>
                    </Box>

                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
}

FullScreenDialog.defaultProps = {
    styles,
    keepMounted: false
};

FullScreenDialog.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    styles: PropTypes.object,
    image: PropTypes.node,
    keepMounted: PropTypes.bool
};
