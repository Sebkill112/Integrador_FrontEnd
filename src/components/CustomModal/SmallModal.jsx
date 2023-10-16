import { forwardRef } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
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

export default function SmallModal({ keepMounted, title, open, handleClose, children, image, styles, disableEscapeKeyDown }) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            sx={{
                '& .MuiDialog-scrollPaper': {
                    alignItems: 'baseline'
                },
                '& .MuiDialog-paper': {
                    minHeight: isXs ? '300px' : '250px',
                    width: isXs ? '370px' : '700px'
                }
            }}
            keepMounted={keepMounted}
            open={open}
            onClose={handleClose}
            disableEscapeKeyDown={disableEscapeKeyDown}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar style={styles?.toolbar}>
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

SmallModal.defaultProps = {
    styles,
    keepMounted: false,
    disableEscapeKeyDown: false
};

SmallModal.propTypes = {
    disableEscapeKeyDown: PropTypes.bool,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    styles: PropTypes.object,
    image: PropTypes.node,
    keepMounted: PropTypes.bool
};
