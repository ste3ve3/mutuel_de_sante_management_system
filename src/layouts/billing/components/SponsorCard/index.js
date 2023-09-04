
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function SponsorCard({ color, index, name, description, value }) {
  return (
    <SoftBox key={name} component="li" py={1} pr={2}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={2}>
            <SoftButton variant="outlined" color={color} size="small" iconOnly circular>
              {index} 
            </SoftButton>
          </SoftBox>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </SoftTypography>
            <SoftTypography variant="caption" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Typechecking props of the SponsorCard
SponsorCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SponsorCard;