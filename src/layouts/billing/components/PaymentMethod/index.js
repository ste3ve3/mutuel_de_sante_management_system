// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import Transaction from "../Transaction"; 
import { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Menu,
  MenuItem,
} from "@mui/material"

function PaymentMethod() {
  const { borderWidth, borderColor } = borders;

  function RenderMenu({ menu, openMenu, closeMenu }) {
    return (
      <Menu
        id="simple-menu"
        anchorEl={menu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menu)}
        onClose={closeMenu}
      >
         <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    );
  }
  
  function RenderMenuWrapper() {
    const [menu, setMenu] = useState(null);
  
    const openMenu = ({ currentTarget }) => setMenu(currentTarget);
    const closeMenu = () => setMenu(null);
  
    return (
      <SoftTypography
        component="div"
        variant="caption"
        color="secondary"
        fontWeight="medium"
      >
        <SoftBox color="text" px={2}>
          <Icon
            sx={{ cursor: "pointer", fontWeight: "bold" }}
            fontSize="small"
            onClick={openMenu}
          >
            more_vert
          </Icon>
        </SoftBox>
        <RenderMenu menu={menu} openMenu={openMenu} closeMenu={closeMenu} />
      </SoftTypography>
    );
  }

  return (
    <Card id="delete-account" sx={{ p: 2}}>
      <SoftBox pt={2} px={2} mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Available Trainings
        </SoftTypography>
        <SoftButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new training
        </SoftButton>
      </SoftBox>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={1}
              sx={{ listStyle: "none" }}
            >
              <SoftTypography variant="h6" fontWeight="medium">
                <Transaction
                  color="dark"
                  index="1"
                  name="Stones and Clay Training"
                  description="26 March 2023 - 28 March 2023"
                />
              </SoftTypography>
              <RenderMenuWrapper />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={1}
              sx={{ listStyle: "none" }}
            >
              <SoftTypography variant="h6" fontWeight="medium">
                <Transaction
                  color="dark"
                  index="2"
                  name="Software Development Training"
                  description="26 March 2023 - 28 March 2023"
                />
              </SoftTypography>
              <RenderMenuWrapper />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={1}
              sx={{ listStyle: "none" }}
            >
              <SoftTypography variant="h6" fontWeight="medium">
                <Transaction
                  color="dark"
                  index="3"
                  name="Artificial Intelligence Training"
                  description="26 March 2023 - 28 March 2023"
                />
              </SoftTypography>
              <RenderMenuWrapper />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={1}
              sx={{ listStyle: "none" }}
            >
              <SoftTypography variant="h6" fontWeight="medium">
                <Transaction
                  color="dark"
                  index="4"
                  name="Engineering Training"
                  description="26 March 2023 - 28 March 2023"
                />
              </SoftTypography>
              <RenderMenuWrapper />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={1}
              sx={{ listStyle: "none" }}
            >
              <SoftTypography variant="h6" fontWeight="medium">
                <Transaction
                  color="dark"
                  index="5"
                  name="GIS and Geotechnical Training"
                  description="26 March 2023 - 28 March 2023"
                />
              </SoftTypography>
              <RenderMenuWrapper />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={1}
              sx={{ listStyle: "none" }}
            >
              <SoftTypography variant="h6" fontWeight="medium">
                <Transaction
                  color="dark"
                  index="6"
                  name="Business Administration Training"
                  description="26 March 2023 - 28 March 2023"
                />
              </SoftTypography>
              <RenderMenuWrapper />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default PaymentMethod;
