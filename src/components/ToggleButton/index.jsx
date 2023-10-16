import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomToggleButtonGroup = styled(ToggleButtonGroup)(
    () => `
        display: flex;
        gap: 2rem;
    `
);

export const CustomToggleButton = styled(ToggleButton)(
    ({ theme }) => `
        padding-left: 2rem;
        padding-right: 2rem;
        &.Mui-selected {
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.primary.contrastText};
        }
        &.Mui-selected:hover {
            background-color: ${theme.palette.primary.dark};
            color: ${theme.palette.primary.contrastText};
        }
    `
);
