import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import CustomLoadingButton from 'components/Button/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const CustomTableToolbar = ({ refreshButtonProps }) => (
    <Box mt={2} px={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CustomLoadingButton variant="contained" startIcon={<RefreshIcon />} {...refreshButtonProps}>
            Recargar
        </CustomLoadingButton>

        <GridToolbarQuickFilter />
    </Box>
);

CustomTableToolbar.propTypes = {
    refreshButtonProps: PropTypes.object
};

export default CustomTableToolbar;
