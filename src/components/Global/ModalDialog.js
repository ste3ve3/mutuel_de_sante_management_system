import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import SoftButton from 'components/SoftButton';

const modalStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

const ModalDialog = ({ title, subTitle, open, handleClose, handleClickOk, item, hardWarning, cancelText, showOkText }) => {
    const [okText, setOkText] = useState('Ok');
    const [showHardWarning, setShowHardWarning] = useState(false);

    return (
        <Modal
            open={open}
            keepMounted
            onClose={() => {
                setOkText('Ok');
                setShowHardWarning(false);
                handleClose();
            }}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h5" id="child-modal-title">
                    {title}
                </Typography>
                <Box sx={{ height: 10 }}></Box>
                <Typography id="child-modal-description" fontSize={16}>{subTitle}</Typography>

                {item && (
                    <Typography variant="body2" id="child-modal-title" sx={{ textAlign: 'center', my: 2, fontWeight: '600' }}>
                        "{item}"
                    </Typography>
                )}
                <Box sx={{ height: item ? 0 : 20 }}></Box>
                {showHardWarning && (
                    <Typography color="error" sx={{ textAlign: 'center', my: 2, fontWeight: '600' }}>
                        {hardWarning}
                    </Typography>
                )}
                <Grid container>
                    <Grid item xs>
                        <SoftButton
                            onClick={() => {
                                setOkText('Ok');
                                setShowHardWarning(false);
                                handleClose();
                            }}
                            variant="gradient"
                            color="error"
                        >
                            {cancelText}
                        </SoftButton>
                    </Grid>
                    {
                        showOkText && 
                        <Grid item>
                            <SoftButton
                                onClick={() => {
                                    if (hardWarning && okText === 'Ok') {
                                        setOkText('Continue');
                                        setShowHardWarning(true);
                                        return;
                                    }
                                    setOkText('Ok');
                                    setShowHardWarning(false);
                                    handleClickOk();
                                }}
                                variant="gradient"
                                color={showHardWarning ? 'error' : 'info'}
                            >
                                {okText}
                            </SoftButton>
                        </Grid>
                    } 
                </Grid>
            </Box>
        </Modal>
    );
};

export default ModalDialog;