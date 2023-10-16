import PropTypes from 'prop-types';
import { useCallback, memo } from 'react';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrap = styled('label')(
    () => `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        padding: 1rem 1rem;
        border: 2px dashed #bbb;
        border-radius: 15px;
        cursor: pointer;
    `
);

const Message = styled(Typography)(
    () => `
        text-align: center;
        color: #666666;
        letter-spacing: 1px;
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        padding: 5px 1rem;
    `
);

/* eslint-disable */
const UploadImage = ({ onResult, validate, children }) => {
    const handleChange = useCallback((event) => {
        event.preventDefault();
        // suport only one file
        // only events change or drop
        const type = event.type;

        let file = null;

        if (type === 'change') {
            file = event.target.files[0];
        } else if (type === 'drop') {
            file = event.dataTransfer.files[0];
        }

        // const isValid = validate(file);

        // if (isValid)
        onResult(file);
    }, []);

    return (
        <Wrap
            onDragOver={(event) => {
                event.preventDefault();
            }}
            onDragEnter={(event) => {
                event.preventDefault();
            }}
            onDrop={handleChange}
        >
            <Message variant="h2">Seleccionar archivo</Message>

            <input type="file" id="i_file" accept=".JPG,.png,.jpeg" style={{ display: 'none' }} onChange={handleChange} />
            {children}
            <Message variant="h2">o arrastra y suelta el archivo aquí</Message>
        </Wrap>
    );
};

UploadImage.defaultProps = {
    validate: () => true
};

UploadImage.propTypes = {
    onResult: PropTypes.func.isRequired,
    validate: PropTypes.func
};

export default memo(UploadImage);
