import PropTypes from 'prop-types';
import { memo } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrap = styled('div')(
    () => `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        padding: 2rem 0;
        margin: 1rem;
        border: 2px dashed #bbb;
        border-radius: 15px;
    `
);

const Image = styled('img')(
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

const UpdateStateComponent = ({ message, image, children }) => (
    <Wrap>
        {image && <Image src={image} alt="Imagen..." />}

        <Message variant="h2">{message}</Message>

        {children}
    </Wrap>
);

UpdateStateComponent.propTypes = {
    message: PropTypes.string.isRequired,
    image: PropTypes.string,
    children: PropTypes.element
};

export default memo(UpdateStateComponent);
