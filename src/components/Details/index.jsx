import { Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

export const WrapItem = styled((props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                    alignItems: 'start',
                    my: '4px'
                }
            }}
            {...props}
        />
    );
})(
    ({ theme }) => `
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: clamp(3px, 1vw, .5rem);
    `
);

export const WrapItemColumn = styled(Box)(
    ({ theme }) => `
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 2px;
    `
);

export const WrapItemTitle = styled((props) => <Typography variant="h5" {...props} />)(
    () => `
        font-size: .94rem;
        font-style: italic;
        color: #444;
        letter-spacing: 1px;
    `
);

export const WrapItemDetail = styled((props) => <Typography variant="h5" {...props} />)(
    () => `
        word-break: break-word;
        font-size: .94rem;
        font-weight: 900;
        letter-spacing: 1px;
    `
);

export const ColumnDetails = styled('div')(
    () => `
        width: 290px;
        display: flex;
        flex-direction: column;
        gap: .4rem;
        align-self: stretch;
    `
);

export const Image = styled((props) => <img alt="..." {...props} />)(
    () => `
        display: block;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 10%;
    `
);

export const LabelImage = styled((props) => <Typography variant="h5" {...props} />)(
    () => `
        font-size: 14px;
        letter-spacing: 1px;
    `
);

export const WrapImage = styled('div')(
    () => `
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        gap: .4rem;
    `
);
