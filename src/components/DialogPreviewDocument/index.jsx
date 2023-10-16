import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
// eslint-disable-next-line
import { Viewer } from '@react-pdf-viewer/core';

const DialogPreviewDocument = ({ open, onClose, url }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '750px',
                    width: '400px'
                }}
            >
                <Viewer fileUrl={url} />
            </div>
        </DialogContent>
    </Dialog>
);

DialogPreviewDocument.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
};

export default DialogPreviewDocument;
