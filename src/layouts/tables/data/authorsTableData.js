/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import SelectInput from "components/SoftInput/SelectInput";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; 
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  FormControl,
  Menu,
  MenuItem,
} from "@mui/material"

export const Author = ({ image, name, email }) => {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}


export const RenderMenu = ({ menu, hasSponsor, closeMenu, onAssign, onEdit, onDelete, onView }) => {
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
      {
        hasSponsor ?
        <MenuItem onClick={onView}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
            View Sponsor
        </MenuItem>
        :
        <MenuItem onClick={onAssign}>
          <ListItemIcon>
            <VolunteerActivismIcon fontSize="small" />
          </ListItemIcon>
            Assign Sponsor
        </MenuItem>
      }
      <MenuItem onClick={onEdit}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>
    </Menu>
  );
}

export function RenderMenuWrapper({ onAssign, onEdit, onDelete, key, hasSponsor, onView }) {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  return (
    <SoftTypography
      component="div"
      variant="caption"
      color="secondary"
      fontWeight="medium"
      key={key}
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
      <RenderMenu menu={menu} openMenu={openMenu} closeMenu={closeMenu} onAssign={onAssign} onEdit={onEdit} onDelete={onDelete} hasSponsor={hasSponsor} onView={onView}/>
    </SoftTypography>
  );
}
