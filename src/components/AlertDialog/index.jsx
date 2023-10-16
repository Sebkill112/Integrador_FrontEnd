import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomButton from 'components/Button';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const CustomDialog = styled(Dialog)(
    () => `
        & .MuiDialog-scrollPaper {
            align-items: baseline;
        }
    `
);

const CustomDialogTitle = styled(DialogTitle)(
    () => `
        font-size: 1.1rem;
        letter-spacing: 1px;
    `
);

const CustomDialogContentText = styled(DialogContentText)(
    () => `
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        font-size: 1rem;
        color: #212629;
        line-height: 1.5rem;
    `
);

const AlertDialog = ({ open, onClose, title, message }) => (
    <CustomDialog
        onClose={onClose}
        BackdropProps={{ sx: { backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,30,0.4)' } }}
        open={open}
        TransitionComponent={Transition}
    >
        <CustomDialogTitle>{title}</CustomDialogTitle>
        <DialogContent sx={{ minWidth: '320px' }} dividers>
            <CustomDialogContentText>{message}</CustomDialogContentText>
        </DialogContent>
        <DialogActions>
            <CustomButton autoFocus onClick={onClose}>
                Aceptar
            </CustomButton>
        </DialogActions>
    </CustomDialog>
);

AlertDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AlertDialog;
