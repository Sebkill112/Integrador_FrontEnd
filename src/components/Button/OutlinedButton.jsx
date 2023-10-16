import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomOutlinedButton = styled(Button)(
    () => `
        display: flex;
        letter-spacing: 0.5px;
        font-size: clamp(1rem, 1.3vw, 1,5rem);
        text-transform: uppercase;
        padding: .45rem 1.3rem;
        font-weight: bold;
        border-radius: 12px;
        border: solid 1px #00b6c2;
    `
);

export default CustomOutlinedButton;
