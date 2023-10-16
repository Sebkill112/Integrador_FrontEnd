import PropTypes from 'prop-types';
import moment from 'moment';
import { useState, useEffect, useCallback } from 'react';
import { Box, Paper, IconButton, Typography, TextField, FormControl, Select, MenuItem, Input } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import IconLoadingButton from 'components/Button/IconLoadingButton';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import './index.css';

import { withStyles } from '@mui/styles';

const WhiteTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black' // Text color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#fff8' // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#fff' // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff' // Solid underline on focus
        }
    }
})(TextField);

const SelectableCard = ({
    selectOptions,
    typeEditableControl,
    onClick,
    onEdit,
    disabled,
    label,
    value,
    editable,
    selectable,
    preventDefault,
    getLabelValue,
    handleChange,
    handleCancelEdit,
    patternValidator
}) => {
    const [editing, setEditing] = useState(false);
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valueEditing, setValueEditing] = useState(value);

    useEffect(() => {
        setValueEditing(value);
    }, [value]);

    const onStartEdit = useCallback(() => {
        // setSelected(true);
        if (preventDefault) {
            onEdit('');
            return;
        }

        setEditing(true);
        setValueEditing(value);
    }, [value]);

    const onCancelEdit = useCallback(() => {
        setSelected(false);
        setValueEditing(value);
        handleCancelEdit();
        setEditing(false);
    }, [value]);

    const onEndEdit = useCallback(async () => {
        setLoading(true);
        if (valueEditing) {
            await onEdit(valueEditing);
        }
        setEditing(false);
        setLoading(false);
        setSelected(false);
    }, [valueEditing]);

    const handleClick = useCallback(() => {
        setSelected(true);
        onStartEdit();
        if (!disabled && !editing && value?.length > 0 && selectable) onClick();
    }, [disabled, editing, selectable, value, onClick]);

    const isValidNewValue = () => {
        if (typeEditableControl === 'date') {
            return valueEditing !== 'Invalid date';
        }

        return new RegExp(patternValidator).test(valueEditing);
    };

    const sortAsc = (antField, field, fieldName) => {
        if (antField[fieldName] < field[fieldName]) return -1;
        if (antField[fieldName] > field[fieldName]) return 1;
        return 0;
    };

    const dateFormatStrValue = (str) => {
        if (str.length < 10) return moment();
        return moment(str.split('/').reverse().join('-')).format('YYYY-MM-DD');
    };

    const getEditableControl = () => {
        if (typeEditableControl === 'select') {
            return (
                <FormControl fullWidth variant="standard" sx={{ mx: 1 }}>
                    {/* <InputLabel id={`${label}-select-control`}>{label}</InputLabel> */}
                    <Select
                        disableUnderline
                        autoFocus
                        labelId={`${label}-select-control`}
                        value={valueEditing}
                        onChange={({ target: { value } }) => {
                            handleChange(value);
                            setValueEditing(value);
                        }}
                    >
                        {selectOptions.data
                            .sort((ant, field) => sortAsc(ant, field, selectOptions.label))
                            .map((option) => (
                                <MenuItem key={option[selectOptions.value]} value={option[selectOptions.value]}>
                                    {option[selectOptions.label]}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            );
        }

        if (typeEditableControl === 'date') {
            return (
                <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={dateFormatStrValue(valueEditing)}
                        onChange={(e) => {
                            if (e === null) return;
                            const newValue = e.format('DD/MM/YYYY');
                            handleChange(newValue);
                            setValueEditing(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                sx={{ mx: 1 }}
                                variant="standard"
                                autoFocus
                                fullWidth
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (isValidNewValue()) onEndEdit();
                                        }

                                        if (e.key === 'Escape') {
                                            onCancelEdit();
                                        }
                                    }
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            );
        }

        return (
            <WhiteTextField
                fullWidth
                autoFocus
                type={typeEditableControl}
                className={`${typeEditableControl ? 'input_number_without_spin' : ''}`}
                variant="standard"
                value={valueEditing}
                onChange={({ target: { value: inputValue } }) => {
                    handleChange(inputValue);
                    setValueEditing(inputValue);
                }}
                sx={{
                    mx: 1
                }}
                inputProps={{
                    style: { color: 'black', fontWeight: 400 },
                    onKeyDown: (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (isValidNewValue()) onEndEdit();
                        }

                        if (e.key === 'Escape') {
                            onCancelEdit();
                        }
                    }
                }}
            />
        );
    };

    return (
        <Paper
            style={{ color: disabled ? '#aaa' : '#000' }}
            className={`wrap ${selected ? 'wrap__selected' : ''} ${disabled ? 'wrap__selected_borderless' : ''}`}
        >
            <Box
                onClick={handleClick}
                style={{
                    cursor: !disabled ? 'pointer' : '',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    flexGrow: '1',
                    height: '42px',
                    maxWidth: editing ? 'calc(100% - 50px)' : '100%',
                    padding: '.4rem 0'
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        display: 'block',
                        margin: 'auto',
                        fontWeight: 'normal',
                        textAlign: 'center',
                        color: '#888'
                    }}
                >
                    {label}
                </Typography>
                {editing ? (
                    getEditableControl()
                ) : (
                    <Typography
                        sx={{
                            display: 'block',
                            margin: 'auto',
                            fontWeight: 500,
                            textAlign: 'center',
                            color: '#000'
                        }}
                        variant="body2"
                    >
                        {getLabelValue(valueEditing)}
                    </Typography>
                )}
            </Box>

            {editable && editing && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconLoadingButton
                        color="secondary"
                        loading={loading}
                        iconButtonProps={{ disabled: !isValidNewValue(), type: 'button', size: 'small' }}
                        onClick={onEndEdit}
                    >
                        <CheckRoundedIcon fontSize="small" />
                    </IconLoadingButton>

                    <IconButton color="error" type="button" size="small" onClick={onCancelEdit}>
                        <ClearRoundedIcon fontSize="small" />
                    </IconButton>
                </div>
            )}
        </Paper>
    );
};

SelectableCard.defaultProps = {
    editable: false,
    selectable: true,
    preventDefault: false,
    typeEditableControl: 'text',
    getLabelValue: (labelValue) => labelValue,
    handleChange: (value) => {},
    handleCancelEdit: () => {},
    patternValidator: '.',
    selectOptions: {
        data: [],
        label: 'label',
        value: 'value'
    }
};

SelectableCard.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onEdit: PropTypes.func,
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
    preventDefault: PropTypes.bool,
    selectable: PropTypes.bool,
    typeEditableControl: PropTypes.oneOf(['text', 'number', 'select', 'date']),
    selectOptions: PropTypes.object,
    getLabelValue: PropTypes.func,
    handleChange: PropTypes.func,
    handleCancelEdit: PropTypes.func,
    patternValidator: PropTypes.string
};

export default SelectableCard;
