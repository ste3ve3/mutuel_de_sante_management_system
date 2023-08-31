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

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import {
  FormControl,
  Menu,
  MenuItem,
} from "@mui/material"

function Author({ image, name, email }) {
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

function Function({ job, org }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <FormControl fullWidth>
          <SelectInput
            options={
              [
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" }
              ]
            }
          />
      </FormControl>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "user info", align: "left" },
    { name: "user role", align: "left" },
    { name: "verification status", align: "center" },
    { name: "joined", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      "user info": <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      "user role": <Function job="Manager" org="Organization" />,
      "verification status": (
        <SoftBadge variant="gradient" badgeContent="verified" color="success" size="xs" container />
      ),
      joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SoftTypography>
      ),
      action: <RenderMenuWrapper />,
    },
    {
      "user info": <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      "user role": <Function job="Programator" org="Developer" />,
      "verification status": (
        <SoftBadge variant="gradient" badgeContent="unverified" color="secondary" size="xs" container />
      ),
      joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SoftTypography>
      ),
      action: <RenderMenuWrapper />,
    },
    {
      "user info": <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      "user role": <Function job="Executive" org="Projects" />,
      "verification status": (
        <SoftBadge variant="gradient" badgeContent="verified" color="success" size="xs" container />
      ),
      joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          19/09/17
        </SoftTypography>
      ),
      action: <RenderMenuWrapper />,
    },
    {
      "user info": <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      "user role": <Function job="Programator" org="Developer" />,
      "verification status": (
        <SoftBadge variant="gradient" badgeContent="verified" color="success" size="xs" container />
      ),
      joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          24/12/08
        </SoftTypography>
      ),
      action: <RenderMenuWrapper />,
    },
    {
      "user info": <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      "user role": <Function job="Manager" org="Executive" />,
      "verification status": (
        <SoftBadge variant="gradient" badgeContent="unverified" color="secondary" size="xs" container />
      ),
      joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          04/10/21
        </SoftTypography>
      ),
      action: <RenderMenuWrapper />,
    },
    {
      "user info": <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      "user role": <Function job="Programtor" org="Developer" />,
      "verification status": (
        <SoftBadge variant="gradient" badgeContent="unverified" color="secondary" size="xs" container />
      ),
      joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          14/09/20
        </SoftTypography>
      ),
      action: <RenderMenuWrapper />,
    },
  ],
};

export default authorsTableData;
