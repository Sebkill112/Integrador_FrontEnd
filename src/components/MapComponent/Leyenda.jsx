import { memo } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const Wrap = styled('div')(
    () => `
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        background: #fff;
        padding: .5rem .8rem;
        border-top-right-radius: 50px;
    `
);

const Body = styled('div')(
    () => `
        display: flex;
        flex-direction: column;
        gap: .4rem;
        margin-top: 10px;
    `
);

const ItemWrap = styled('div')(
    () => `
        display: flex;
        gap: 8px;
    `
);

const ItemLabel = styled(Typography)(
    () => `
        font-size: .8rem;
        font-weight: bold;
    `
);

const Title = styled(Typography)(
    () => `
        font-size: .9rem;
        font-weight: bold;
    `
);

const Leyenda = ({ items }) => (
    <Wrap>
        <Title>Leyenda</Title>
        <Body>
            {items.map((item, index) => (
                <ItemWrap key={index}>
                    <img width={16} height={16} src={item.icon} alt="" />
                    <ItemLabel>{item.label}</ItemLabel>
                </ItemWrap>
            ))}
        </Body>
    </Wrap>
);

Leyenda.propTypes = {
    items: PropTypes.array.isRequired
};

export default memo(Leyenda);
