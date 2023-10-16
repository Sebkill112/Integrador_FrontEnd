import PropTypes from 'prop-types';
import { useState, useEffect, memo, useRef } from 'react';
import { Menu, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChromePicker } from 'react-color';

const Color = styled('div')(
    () => `
        width: 40px;
        height: 20px;
        border: 1px solid #333;
    `
);

/* eslint-disable react/jsx-no-duplicate-props */
const ColorPicker = ({ label, name, variant, value, onChange }) => {
    const inputRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChangeColor = (color, event) => {
        onChange(color);
    };

    return (
        <>
            <TextField
                inputProps={{ ref: inputRef }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Color style={{ backgroundColor: value }} />
                        </InputAdornment>
                    )
                }}
                onClick={handleFocus}
                fullWidth
                variant={variant}
                name={name}
                value={value}
                label={label}
            />
            <Menu sx={{ p: 0, m: 0 }} keepMounted anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <ChromePicker color={value} onChange={handleChangeColor} />
            </Menu>
        </>
    );
};

ColorPicker.defaultProps = {
    label: '',
    name: 'color',
    variant: 'outlined'
};

ColorPicker.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
    onChange: PropTypes.func.isRequired
};

export default memo(ColorPicker);
