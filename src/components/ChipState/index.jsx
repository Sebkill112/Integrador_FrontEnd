import PropTypes from 'prop-types';
import { memo } from 'react';
import { Chip } from '@mui/material';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';

const ChipState = ({ state }) => (
    <div
        style={{
            border: 'solid 1px',
            color: state === 'A' ? 'rgb(138, 194, 6)' : '#A0A0A0',
            fontWeight: 'bold',
            width: '80px',
            margin: '0 auto',
            padding: '2px 0',
            textAlign: 'center',
            borderRadius: '4px'
        }}
    >
        {state === 'A' ? 'Activo' : 'Inactivo'}
    </div>
);

ChipState.propTypes = {
    state: PropTypes.oneOf(['A', 'I']).isRequired
};

export default memo(ChipState);
