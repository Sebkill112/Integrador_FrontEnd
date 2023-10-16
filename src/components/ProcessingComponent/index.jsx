import PropTypes from 'prop-types';
import { memo } from 'react';

// Material Components
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Assets
import ProcessingGif from 'assets/images/processing.gif';

const Wrap = styled('div')(
    () => `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        padding: 1.5rem 0 2rem 0;
        margin: 1rem;
        border: 2px dashed #bbb;
        border-radius: 15px;
    `
);

const ImageProcessing = styled('img')(
    () => `
        display: block;
        width: 60%;
        max-width: 200px;
        min-width: 170px;
        height: auto;
        margin: 0 auto;
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

const ProcessingComponent = ({ message }) => (
    <Wrap>
        <ImageProcessing src={ProcessingGif} alt="Processing" />

        <Message variant="h2">{message}</Message>
    </Wrap>
);

ProcessingComponent.propTypes = {
    message: PropTypes.string.isRequired
};

export default memo(ProcessingComponent);
