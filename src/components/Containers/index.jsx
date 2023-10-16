import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export const FlexBox = ({ spacing, direction, justifyContent, alignItems, fullWidth, flexWrap, sx, children }) => {
    const getSxProps = () => ({
        ...sx,
        display: 'flex',
        flexWrap,
        justifyContent,
        alignItems,
        flexDirection: direction,
        gap: spacing,
        width: fullWidth ? '100%' : 'auto'
    });

    return <Box sx={getSxProps()}>{children}</Box>;
};

export const Row = () => {};
export const Column = () => {};

FlexBox.defaultProps = {
    spacing: '0',
    direction: 'row',
    justifyContent: 'start',
    alignItems: 'start',
    fullWidth: false,
    sx: {}
};

FlexBox.propTypes = {
    sx: PropTypes.object,
    spacing: PropTypes.string,
    fullWidth: PropTypes.bool,
    flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),
    direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
    justifyContent: PropTypes.oneOf(['center', 'start', 'end', 'space-between', 'space-around', 'space-evenly', 'stretch']),
    alignItems: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
    children: PropTypes.node.isRequired
};
