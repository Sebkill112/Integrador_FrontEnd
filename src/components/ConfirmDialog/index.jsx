import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomButton from 'components/Button';
import CustomLoadingButton from 'components/Button/LoadingButton';

import useLoader from 'hooks/useLoader';

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

const ConfirmDialog = ({ open, onClose, onAccept, title, message }) => {
    const loader = useLoader();

    const handleAccept = async () => {
        try {
            loader.startLoading();
            await onAccept();
        } catch (error) {
            console.error(error);
        } finally {
            loader.stopLoading();
            onClose();
        }
    };

    return (
        <CustomDialog
            BackdropProps={{ sx: { backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,30,0.4)' } }}
            open={open}
            TransitionComponent={Transition}
        >
            <CustomDialogTitle>{title}</CustomDialogTitle>
            <DialogContent sx={{ minWidth: '320px' }} dividers>
                <CustomDialogContentText>{message}</CustomDialogContentText>
            </DialogContent>
            <DialogActions>
                <CustomButton onClick={onClose}>Cancelar</CustomButton>
                <CustomLoadingButton loading={loader.loading} onClick={handleAccept}>
                    Aceptar
                </CustomLoadingButton>
            </DialogActions>
        </CustomDialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default ConfirmDialog;
