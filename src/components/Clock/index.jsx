import { useEffect, useState, memo } from 'react';
import { Typography } from '@mui/material';

const Clock = () => {
    const [time, changeTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setInterval(() => {
            changeTime(new Date().toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <Typography sx={{ fontWeight: 'bold', color: ' #666' }} variant="h4">
            {time}
        </Typography>
    );
};

export default memo(Clock);
