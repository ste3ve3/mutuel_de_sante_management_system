import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SponsorContainer from "./components/SponsorContainer";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4} >
        <SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SponsorContainer />
          </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Billing;
