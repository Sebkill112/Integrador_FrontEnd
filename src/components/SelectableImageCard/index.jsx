import PropTypes from 'prop-types';
import { useState } from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SquareImage from 'assets/images/square.png';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import ModalImage from 'components/ModalImage';

const useStyles = makeStyles((theme) => ({
    image_selected: {
        border: '2px solid #00B6C2',
        boxShadow: 'none'
    },
    image_selected_borderless: {
        border: '.1px solid rgb(212, 212, 212)',
        boxShadow: 'none'
    },
    square: {
        position: 'absolute',
        top: '40px',
        right: '20px',
        borderRadius: '3px'
    },
    check: {
        position: 'absolute',
        top: '37px',
        right: '17px'
    },
    editable: {
        position: 'absolute',
        top: '-6px',
        right: '0'
    },
    fullscreen: {
        color: '#fff',
        position: 'absolute',
        bottom: '10px',
        right: '10px'
    },
    hide: {
        display: 'none'
    },
    show: {
        display: 'inline-block'
    }
}));

const SelectableImage = styled('img')(
    () => `
    overflow: hidden;
    display: inline-block;
    margin: 0 auto;
    height: 200px;
    width: 100%;
    min-width: 200px;
    border-radius: 15px;
    border: 2px solid rgb(150, 150, 150);
    box-shadow: 1px 1px 2px rgb(182, 182, 182);
    object-fit: contain;
    cursor: pointer;
`
);

const Wrap = styled(Paper)(
    () => `
    position: relative;
`
);

const styles = {
    wrap: {
        display: 'inline-block',
        margin: '0 auto',
        width: '100%',
        height: '160px',
        minWidth: '120px',
        borderRadius: '15px'
    },
    image: { height: '175px', width: '100%', minWidth: '120px' },
    square: { top: '40px', right: '20px' },
    check: { top: '40px', right: '20px' },
    fullscreen: {
        bottom: '-45px',
        right: '10px'
    }
};

const SelectableImageCard = ({ src, selectable, selected, onClick, loading, disabled, label, editable, onEdit }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

    const onMouseEnter = () => setShow(true);
    const onMouseLeave = () => setShow(false);

    const onSelected = () => {
        if (!loading && !disabled && selectable) onClick();
    };

    return (
        <Wrap style={styles.wrap} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Box>
                <Typography ml={1} mb={1} style={{ color: disabled ? '#aaa' : '#000' }} variant="h5" noWrap>
                    {label}
                </Typography>

                <SelectableImage
                    onClick={onSelected}
                    style={styles.image}
                    className={`${selected ? classes.image_selected : ''} ${!disabled ? '' : classes.image_selected_borderless}`}
                    src={src}
                    alt="..."
                />
                {selectable && (
                    <>
                        <img
                            width="15"
                            height="15"
                            className={`${selected || disabled || loading || !src ? classes.hide : classes.show} ${classes.square}`}
                            src={SquareImage}
                            style={styles.square}
                            alt="..."
                        />

                        <CheckBoxOutlinedIcon
                            fontSize="small"
                            sx={{ color: `${disabled ? '#aaa' : '#33D833'}` }}
                            className={`${selected ? classes.show : classes.hide} ${classes.check}`}
                        />
                    </>
                )}

                {/* <img
                    src={CheckImage}
                    width="20"
                    height="20"
                    className={`${selected ? classes.show : classes.hide} ${classes.check}`}
                    alt="..."
                    style={style?.check}
                /> */}

                {editable && !selected && (
                    <IconButton color="primary" disabled={disabled} className={`${classes.editable}`} onClick={onEdit}>
                        <EditRoundedIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            <Box>
                <IconButton
                    className={`${show ? classes.show : classes.hide} ${classes.fullscreen}`}
                    style={styles.fullscreen}
                    onClick={openModal}
                >
                    <FullscreenIcon style={{ backgroundColor: 'rgba(255, 255, 255, .8)', color: 'gray' }} />
                </IconButton>

                {/** Modal Image */}
                <ModalImage src={src} open={open} handleClose={closeModal} />
            </Box>
        </Wrap>
    );
};

SelectableImageCard.defaultProps = {
    editable: false,
    onClick: () => {},
    selectable: true
};

SelectableImageCard.propTypes = {
    src: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    editable: PropTypes.bool,
    onEdit: PropTypes.func,
    selectable: PropTypes.bool
};

export default SelectableImageCard;
