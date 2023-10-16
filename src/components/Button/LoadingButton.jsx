import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

const CustomLoadingButton = styled(LoadingButton)(
    () => `
        display: flex;
        letter-spacing: 0.5px;
        font-size: clamp(1rem, 1.3vw, 1,5rem);
        text-transform: uppercase;
        padding: .3rem 1.3rem;
        font-weight: bold;
        border-radius: 12px;
    `
);

export default CustomLoadingButton;
