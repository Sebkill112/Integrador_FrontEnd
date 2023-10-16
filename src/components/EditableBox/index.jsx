import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { stubTrue } from 'lodash';

const styles = {
    wrap: {
        display: 'block',
        width: '100%'
    },
    input_style: {
        display: 'block',
        width: '100%',
        border: '1px solid #ccc',
        backgroundColor: '#eee',
        padding: '.5rem 1rem',
        cursor: 'text'
    }
};

const WrapMessage = styled('div')(
    () => `
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relativo;
    `
);

const EditableBox = ({ disabled, value, editable, renderValue, renderInput, onChange, onStartEdit, onEndEdit, onCancelEdit, onClear }) => {
    const [valueEditing, setValueEditing] = useState(value);
    const [editing, setEditing] = useState(false);

    const handleCancelEdit = () => {
        setValueEditing(value);
        setEditing(false);
        onCancelEdit();
    };

    const handleStartEdit = () => {
        setEditing(true);
        onStartEdit();
    };

    const handleEndEdit = () => {
        setEditing(false);
        onEndEdit(valueEditing);
    };

    const getInputProps = () => ({
        value: valueEditing,
        fullWidth: true,
        autoFocus: true,
        variant: 'standard',
        onChange: (e) => {
            const newValue = e.target.value;
            setValueEditing(newValue);
        },
        inputProps: {
            onKeyDown: (e) => {
                if (e.key === 'Enter') {
                    // e.stopPropagation();
                    // e.preventDefault();
                    // handleEndEdit();
                }

                // if (e.key === 'Escape') {
                //     handleCancelEdit();
                // }
            }
        },
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handleEndEdit} size="small" color="secondary">
                        <CheckRoundedIcon />
                    </IconButton>

                    <IconButton onClick={handleCancelEdit} size="small" color="error">
                        <ClearRoundedIcon />
                    </IconButton>
                </InputAdornment>
            )
        }
    });

    return (
        <Box style={styles.wrap}>
            {editing ? (
                renderInput(getInputProps())
            ) : (
                <WrapMessage>
                    {renderValue(valueEditing)}
                    {/* <IconButton onClick={handleStartEdit} color="primary">
                        <EditRoundedIcon fontSize="small" />
                    </IconButton> */}
                </WrapMessage>
            )}

            {/* <IconButton
                // style={{ backgroundColor: '#eee' }}
                color="primary"
                aria-label="upload picture"
                component="span"
            >
                {editing ? <CheckIcon /> : <EditIcon />}
            </IconButton> */}
        </Box>
    );
};

EditableBox.defaultProps = {
    disabled: false,
    editable: true,
    renderValue: (value) => <Typography variant="body2">{value}</Typography>,
    renderInput: (props) => <TextField {...props} />,
    onChange: () => {},
    onStartEdit: () => {},
    onEndEdit: () => {},
    onCancelEdit: () => {},
    onClear: () => {}
};

EditableBox.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.any.isRequired,
    editable: PropTypes.bool,
    renderValue: PropTypes.func,
    renderInput: PropTypes.func,
    onChange: PropTypes.func,
    onStartEdit: PropTypes.func,
    onEndEdit: PropTypes.func,
    onCancelEdit: PropTypes.func,
    onClear: PropTypes.func
};

export default EditableBox;
