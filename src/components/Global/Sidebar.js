import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Scrollbar from "./scrollbar/Scrollbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

// ----------------------------------------------------------------------

Sidebar.propTypes = {
  openSidebar: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  onCloseSidebar: PropTypes.func,
};

export default function Sidebar({
  openSidebar,
  onOpenSidebar,
  onCloseSidebar,
  children,
  handleSubmit = () => {},
  title = "Add Data",
  state = {},
  hideButton = false,
}) {
  return (
    <>
      {!hideButton && (
        <SoftButton variant="gradient" color="dark" onClick={onOpenSidebar}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;{title}
        </SoftButton>
      )}
      <Drawer
        anchor="right"
        open={openSidebar}
        onClose={onCloseSidebar}
        PaperProps={{
          sx: { width: 320, border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <SoftTypography variant="h5" sx={{ ml: 1 }}>
            {title}
          </SoftTypography>
          <IconButton onClick={onCloseSidebar}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {state.error && (
          <Alert variant="standard" severity="error" sx={{}}>
            {state.error}
          </Alert>
        )}
        <Divider />
        <Scrollbar>
          <Stack spacing={2} sx={{ p: 2 }}>
            {children}
          </Stack>
        </Scrollbar>
        <Box sx={{ p: 3 }}>
          <SoftButton
            fullWidth
            size="large"
            type="submit"
            color="dark"
            variant="gradient"
            onClick={state.loading ? null : handleSubmit}
            startIcon={
              state.loading ? (
                <CircularProgress size={20} color="dark" />
              ) : undefined
            }
          >
            {state.loading ? "Loading..." : title}
          </SoftButton>
        </Box>
      </Drawer>
    </>
  );
}