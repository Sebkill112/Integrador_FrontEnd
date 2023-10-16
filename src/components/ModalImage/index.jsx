import PropTypes from 'prop-types';
import { memo } from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { RViewer, RViewerTrigger } from 'react-viewerjs';
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';

const style = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        minWidth: '300px',
        height: '100%',
        backgroundColor: 'rgba(10, 10, 10, .6)', // 'rgba(160, 160, 160, .4)',
        boxShadow: 24
    },
    image: {
        display: 'block',
        width: '100%',
        height: '100%'
    },
    closeIcon: {
        position: 'absolute',
        top: '2%',
        right: '2%',
        color: '#fff'
    }
};

const ModalImage = ({ src, open, handleClose }) => {
    const options = {
        toolbar: {
            // Since there is only one picture, let's hide "prev" and "next"
            prev: false,
            next: false
        }
    };

    return (
        <Modal open={open} onClose={handleClose} disableRestoreFocus>
            <Box style={style.container}>
                {/* <RViewer options={options} imageUrls={src}>
                    <RViewerTrigger>
                        <Button variant="contained">aa</Button>
                    </RViewerTrigger>
                </RViewer> */}
                <PinchZoomPan position="center" zoomButtons>
                    <img style={{ objectFit: 'contain' }} src={src} alt="..." />
                </PinchZoomPan>

                <IconButton style={style.closeIcon} onClick={handleClose}>
                    <CloseIcon style={{ fontSize: '28px', borderRadius: '15px' }} />
                </IconButton>
            </Box>
        </Modal>
    );
};

ModalImage.propTypes = {
    src: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default memo(ModalImage);
