import { Button, ButtonBase, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

const ChooseFileImage = ({ title, onSelect, selected, error, fullWidth = true }) => {
    const handleClickUpload = (e) => {
        // setError('');
        const input = document.getElementById('choose-file-upload');
        input?.click();
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        // setSelectedImage(files[0]);
        var reader = new FileReader();

        reader.onloadend = function () {
            //Base 64
            onSelect(reader.result);
        };

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    };
    return (
        <Stack sx={{ my: 1 }} alignItems="start" spacing={2}>
            <SoftTypography variant="h6">{title}</SoftTypography>

            {selected && (
                <img src={selected} alt="Choosen" style={{ objectFit: 'contain', height: 200, width: '100%', borderRadius: 10 }} />
            )}
            {error && (
                <SoftTypography variant="caption" color="error">
                    {error}
                </SoftTypography>
            )}
            {!selected && (
                <ButtonBase
                    onClick={handleClickUpload}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: fullWidth ? '100%' : '50%',
                            lg: fullWidth ? '100%' : '30%'
                        }
                    }}
                >
                    <Stack
                        sx={{ height: 200, width: '100%', borderRadius: 3, border: 1 }}
                        justifyContent="center"
                        alignItems={'center'}
                        spacing={0.5}
                    >
                        <AddAPhotoIcon />
                        <SoftTypography variant="h6">Click to select a photo</SoftTypography>
                    </Stack>
                </ButtonBase>
            )}
            <input type="file" id="choose-file-upload" hidden accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange} />
            {selected && (
                <SoftButton variant="gradient" color="info" component="label" onClick={handleClickUpload}>
                    Change Image
                </SoftButton>
            )}
        </Stack>
    );
};

export default ChooseFileImage;