import PropTypes from 'prop-types';
import { IconButton, CircularProgress } from '@mui/material';

const IconLoadingButton = ({ loading, children, onClick, color, iconButtonProps }) => {
    if (loading) {
        return (
            <IconButton color={color} disabled {...iconButtonProps}>
                <CircularProgress color="inherit" size={20} />
            </IconButton>
        );
    }

    return (
        <IconButton color={color} onClick={onClick} {...iconButtonProps}>
            {children}
        </IconButton>
    );
};

IconLoadingButton.defaultProps = {
    loading: false,
    color: 'primary'
};

IconLoadingButton.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    iconButtonProps: PropTypes.object,
    color: PropTypes.string
};

export default IconLoadingButton;
