import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserView, MobileView } from 'react-device-detect';
import moment from 'moment';

const CustomDatePicker = ({ value, label, size, onChange, name }) => {
    const dateFormatStrValue = (str) => {
        if (str.length < 10) return null;
        return moment(str.split('/').reverse().join('-')).format('YYYY-MM-DD');
    };
    return (
        <>
            <BrowserView>
                <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={dateFormatStrValue(value)}
                        label={label}
                        onError={(error) => console.log(error)}
                        onChange={(e) => {
                            if (e === null) return;
                            const newValue = e.format('YYYY-MM-DD');
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                size="small"
                                {...{ ...params, error: false }}
                                name={name}
                                sx={{
                                    '& .MuiInputAdornment-positionEnd': { pr: 2 }
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </BrowserView>

            <MobileView>
                <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={dateFormatStrValue(value)}
                        label={label}
                        onError={(error) => console.log(error)}
                        onChange={(e) => {
                            if (e === null) return;
                            const newValue = e.format('DD/MM/YYYY');
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                size={size}
                                {...{ ...params, error: false }}
                                name={name}
                                sx={{
                                    '& .MuiInputAdornment-positionEnd': { pr: 2 }
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </MobileView>
        </>
    );
};

CustomDatePicker.defaultProps = {
    size: 'small'
};

CustomDatePicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['medium']),
    label: PropTypes.string,
    name: PropTypes.string
};

export default CustomDatePicker;
